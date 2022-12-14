import React from 'react';

interface InputProps {
  type: string;
  id: string;
  name: string;
  value?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  required?: boolean;
}

export function Input({
  type,
  id,
  name,
  value,
  onChange,
  required
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
