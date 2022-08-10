import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import s from './Form.module.css';

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
      <p className={s['label-text']}>{label}</p>
      {children}
      {message && <p className={s["error-message"]}>{message}</p>}
    </label>
  );
}
