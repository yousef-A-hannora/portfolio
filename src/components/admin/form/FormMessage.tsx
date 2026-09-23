import { AlertCircle, CheckCircle } from 'lucide-react';

type FormMessageProps = {
  type: 'error' | 'success';
  message: string | null | undefined;
};

export function FormMessage({ type, message }: FormMessageProps) {
  if (!message) return null;

  const isError = type === 'error';
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={
        isError
          ? 'flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600'
          : 'flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700'
      }
    >
      {isError ? <AlertCircle size={16} className="shrink-0" /> : <CheckCircle size={16} className="shrink-0" />}
      {message}
    </div>
  );
}
