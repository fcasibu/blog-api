import * as React from 'react';

interface TextAreaProps {
  id: string;
  name: string;
  value: string;
  onChange(e: React.FormEvent): void;
}

export function TextArea({ id, name, value, onChange }: TextAreaProps) {
  return (
    <textarea id={id} name={name} value={value} onChange={onChange} />
  )
}

