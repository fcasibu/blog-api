import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit(e: React.FormEvent): void;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit">Submit</button>
    </form>
  );
}
