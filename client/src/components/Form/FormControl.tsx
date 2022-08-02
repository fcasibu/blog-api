import React from 'react';

interface IErrors {
  param: string;
  msg: string;
}

interface FormControlProps {
  children: React.ReactNode;
  id: string;
  label: string;
  errors?: IErrors[];
}

export function FormControl({
  children,
  id,
  label,
  errors = []
}: FormControlProps) {
  const message = errors.find((el) => el.param === id)?.msg;

  return (
    <label htmlFor={id}>
      <p>{label}</p>
      {children}
      <span>{message}</span>
    </label>
  );
}
