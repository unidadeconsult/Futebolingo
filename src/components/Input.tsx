import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import './Input.css';

interface FieldWrapperProps {
  label?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, children }: FieldWrapperProps) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

export function TextInput({
  label,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <FieldWrapper label={label}>
      <input className="input-text" {...rest} />
    </FieldWrapper>
  );
}

export function SelectInput({
  label,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <FieldWrapper label={label}>
      <select className="input-select" {...rest}>
        {children}
      </select>
    </FieldWrapper>
  );
}

export function AutoTextarea({
  value,
  className = '',
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      className={`input-textarea ${className}`}
      value={value}
      rows={1}
      {...rest}
    />
  );
}
