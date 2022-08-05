import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_KEY } from '../../config';
import useForm from '../../hooks/useForm';
import Form, { FormControl, Input } from '../../components/Form';
import useCMS from '../../hooks/useCMS';
import handleAuthError from '../../utils/handleAuthError';

const init = {
  height: 500,
  menubar: true,
  toolbar:
    'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
};

const formInitialValues = {
  title: '',
  tag: '',
}

export default function EditPost() {
  const {
    documents: { post },
    getPost,
    editPost
  } = useCMS();
  const { postId } = useParams();

  const [editorValue, setEditorValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { formValues, setFormValues, changeHandler, errors, setErrors } = useForm(formInitialValues);

  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { submitter } = e.nativeEvent as SubmitEvent;
      const { value } = submitter as HTMLButtonElement;
      setIsLoading(true);
      const response = await editPost({
        body: editorValue,
        title: formValues.title,
        tag: formValues.tag,
        published: value
      }, postId as string)

      setIsLoading(false);
      if (response.data.errors) return setErrors(response.data.errors);

      await getPost(postId as string);
    } catch (err) {
      setErrors(handleAuthError(err as AxiosError));
    }
  }

  React.useEffect(() => {
    getPost(postId as string);
  }, []);

  React.useEffect(() => {
    if (post) {
      setEditorValue(post.body)
      setFormValues({
        title: post.title,
        tag: post.tag
      })
    }
  }, [post]);

  return (
    <div>
      <Form customButtons onSubmit={submitHandler} isLoading={isLoading}>
        <FormControl id="title" label="Post Title" errors={errors}>
          <Input type="text" name="title" id="title" value={formValues.title} onChange={changeHandler} />
        </FormControl>
        <FormControl id="tag" label="Post Tag" errors={errors}>
          <Input type="text" name="tag" id="tag" value={formValues.tag} onChange={changeHandler} />
        </FormControl>

        <FormControl id="body" label="Post Body" errors={errors}>
          <Editor
            apiKey={TINYMCE_KEY}
            value={editorValue}
            onEditorChange={setEditorValue}
            init={init}
            id="body"
          />
        </FormControl>
        <button type="submit" name="save-draft" value="false">Save as Draft</button>
        <button type="submit" name="publish" value="true">Publish Post</button>
      </Form>
    </div>
  );
}
