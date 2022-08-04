import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export interface IErrors {
  param: string;
  msg: string;
}

interface FormControlProps {
  children: React.ReactNode;
  id: string;
  label: string;
  errors: IErrors[] | [];
}


export function FormControl({ children, id, label, errors = [] }: FormControlProps) {
  const [labelRef] = useAutoAnimate<HTMLLabelElement>();
  const message = errors.find((el) => el.param === id)?.msg;

  return (
    <label htmlFor={id} ref={labelRef}>
      <p>{label}</p>
      {children}
      {message && <p>{message}</p>}
    </label>
  );
}
