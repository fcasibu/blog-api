import React from 'react';

export default function useForm<T>(initialValue: T) {
  const [formValues, setFormValues] = React.useState<T>(initialValue);
  const [errors, setErrors] = React.useState([]);

  const changeHandler = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return { formValues, changeHandler, errors, setErrors };
}
