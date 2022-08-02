import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit(e: React.FormEvent): void;
  isLoading: boolean;
}

export default function Form({ children, onSubmit, isLoading }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
}
