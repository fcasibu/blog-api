import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit(e: React.FormEvent): void;
  isLoading: boolean;
  customButtons?: boolean
}

export default function Form({ children, onSubmit, isLoading, customButtons }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      {!customButtons &&
        <button type="submit" disabled={isLoading} name="test" value="lol">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>}
    </form>
  );
}
