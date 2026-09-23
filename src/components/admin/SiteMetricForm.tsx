'use client';

import { useState, useTransition } from 'react';
import { updateSiteMetric } from '@/actions/metrics';
import type { FieldErrors } from '@/lib/action-result';
import { MetricCard } from '@/components/sections/MetricCard';
import { MetricFields, type MetricFormValue } from './form/MetricFields';
import { FormMessage } from './form/FormMessage';
import { cardClass, primaryButtonClass } from './form/styles';

type SiteMetricFormProps = {
  metric: { id: string; key: string; value: number; prefix: string; suffix: string; label: string; icon: string };
  index: number;
};

export function SiteMetricForm({ metric, index }: SiteMetricFormProps) {
  const [value, setValue] = useState<MetricFormValue>({
    value: String(metric.value),
    prefix: metric.prefix,
    suffix: metric.suffix,
    label: metric.label,
    icon: metric.icon,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const previewValue = Number.parseInt(value.value, 10);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrors({});
    setFormError(null);
    setSuccess(null);
    startTransition(async () => {
      try {
        const result = await updateSiteMetric(metric.id, value);
        if (result.ok) {
          setSuccess('Metric saved.');
        } else {
          setFormError(result.error);
          setErrors(result.fieldErrors ?? {});
        }
      } catch {
        setFormError('Something went wrong. Please try again.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} p-5 sm:p-6 space-y-5`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900">Card {index + 1}</p>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{metric.key}</span>
      </div>
      <FormMessage type="error" message={formError} />
      <FormMessage type="success" message={success} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <MetricFields idPrefix={`site-metric-${index}`} value={value} onChange={setValue} errors={errors} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">Preview</p>
          <MetricCard
            value={Number.isFinite(previewValue) && previewValue >= 0 ? previewValue : 0}
            prefix={value.prefix}
            suffix={value.suffix}
            label={value.label || 'Label'}
            icon={value.icon || 'Circle'}
          />
        </div>
      </div>
      <button type="submit" className={primaryButtonClass} disabled={isPending}>
        {isPending ? 'Saving…' : 'Save metric'}
      </button>
    </form>
  );
}
