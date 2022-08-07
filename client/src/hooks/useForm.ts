import * as React from 'react';
import { IErrors } from '../components/Form';

export default function useForm<T>(initialValue: T) {
  const [formValues, setFormValues] = React.useState(initialValue);
  const [errors, setErrors] = React.useState<IErrors[] | []>([]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: name === 'image' ? files?.[0] : value
    }));
  };

  return { formValues, errors, changeHandler, setErrors, setFormValues };
}
