import * as React from 'react';
import { IErrors } from '../components/Form';

export default function useForm<T>(initialValue: T) {
  const [formValues, setFormValues] = React.useState(initialValue);
  const [errors, setErrors] = React.useState<IErrors[] | []>([]);

  const changeHandler = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return { formValues, errors, changeHandler, setErrors, setFormValues };
}
