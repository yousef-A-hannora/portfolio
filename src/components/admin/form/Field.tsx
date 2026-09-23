type FieldProps = {
  label: string;
  htmlFor?: string;
  error?: string[];
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, htmlFor, error, hint, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error?.length && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
      {error?.length ? <p className="mt-1.5 text-xs font-medium text-red-500">{error[0]}</p> : null}
    </div>
  );
}
