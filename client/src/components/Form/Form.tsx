import React from 'react';
import Spinner from '../Spinner';
import s from './Form.module.css';

interface FormProps {
  children: React.ReactNode;
  onSubmit(e: React.FormEvent): void;
  isLoading: boolean;
  customButtons?: boolean;
}

export default function Form({
  children,
  onSubmit,
  isLoading,
  customButtons
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className={s.form}>
      {children}
      {!customButtons && (
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </button>
      )}
    </form>
  );
}
