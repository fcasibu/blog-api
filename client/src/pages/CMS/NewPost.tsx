import * as React from 'react';
import { AxiosError } from 'axios';
import useForm from '../../hooks/useForm';
import useCMS from '../../hooks/useCMS';
import handleAuthError from '../../utils/handleAuthError';
import CMSForm from '../../components/CMSForm';

const formInitialValues = {
  title: '',
  tag: '',
  image: ''
};

export default function EditPost() {
  const { getPost, createPost } = useCMS();
  const [editorValue, setEditorValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { formValues, changeHandler, errors, setErrors } =
    useForm(formInitialValues);

  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { submitter } = e.nativeEvent as SubmitEvent;
      const { name } = submitter as HTMLButtonElement;
      const data = new FormData();
      data.append('image', formValues.image);
      data.append('body', editorValue);
      data.append('title', formValues.title);
      data.append('tag', formValues.tag);
      setIsLoading(true);
      const response = await createPost(data, name);

      setIsLoading(false);
      if (response.data.errors) return setErrors(response.data.errors);

      await getPost(response.data.post._id as string);
    } catch (err) {
      setErrors(handleAuthError(err as AxiosError));
    }
  };

  return (
    <div>
      <CMSForm
        formValues={formValues}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        isLoading={isLoading}
        isRequired
        errors={errors}
        editorValue={editorValue}
        setEditorValue={setEditorValue}
      />
    </div>
  );
}
