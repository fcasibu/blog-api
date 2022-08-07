import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import { TINYMCE_KEY } from '../../config';
import Form, { FormControl, IErrors, Input } from '../Form';

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

interface CMSFormProps {
  formValues: { [key: string]: string };
  submitHandler: (e: React.FormEvent) => void;
  isLoading: boolean;
  errors: IErrors[];
  changeHandler: (e: React.FormEvent) => void;
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function CMSForm({
  formValues,
  submitHandler,
  isLoading,
  errors,
  changeHandler,
  editorValue,
  setEditorValue
}: CMSFormProps) {
  return (
    <Form customButtons onSubmit={submitHandler} isLoading={isLoading}>
      <FormControl id="title" label="Post Title" errors={errors}>
        <Input
          type="text"
          name="title"
          id="title"
          value={formValues.title}
          onChange={changeHandler}
        />
      </FormControl>
      <FormControl id="tag" label="Post Tag" errors={errors}>
        <Input
          type="text"
          name="tag"
          id="tag"
          value={formValues.tag}
          onChange={changeHandler}
        />
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
      <button type="submit" name="draft" value="false">
        Save as Draft
      </button>
      <button type="submit" name="publish" value="true">
        Publish Post
      </button>
    </Form>
  );
}