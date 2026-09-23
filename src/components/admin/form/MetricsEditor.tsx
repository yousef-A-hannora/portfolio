'use client';

import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import type { FieldErrors } from '@/lib/action-result';
import { MetricFields, type MetricFormValue } from './MetricFields';
import { iconButtonClass, secondaryButtonClass } from './styles';

export type MetricItem = MetricFormValue & { key: string };

type MetricsEditorProps = {
  value: MetricItem[];
  onChange: (items: MetricItem[]) => void;
  createKey: () => string;
  errors?: FieldErrors;
  maxItems?: number;
};

export function MetricsEditor({ value, onChange, createKey, errors, maxItems = 12 }: MetricsEditorProps) {
  function move(index: number, offset: -1 | 1) {
    const target = index + offset;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {value.map((metric, index) => (
        <div key={metric.key} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Metric {index + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" className={iconButtonClass} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                <ChevronUp size={16} />
              </button>
              <button
                type="button"
                className={iconButtonClass}
                onClick={() => move(index, 1)}
                disabled={index === value.length - 1}
                aria-label="Move down"
              >
                <ChevronDown size={16} />
              </button>
              <button
                type="button"
                className={`${iconButtonClass} hover:bg-red-50! hover:text-red-500!`}
                onClick={() => onChange(value.filter((item) => item.key !== metric.key))}
                aria-label="Remove metric"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <MetricFields
            idPrefix={`metric-${index}`}
            value={metric}
            onChange={(updated) => onChange(value.map((item) => (item.key === metric.key ? { ...updated, key: metric.key } : item)))}
            errors={errors}
            errorPrefix={`metrics.${index}.`}
          />
        </div>
      ))}

      {value.length < maxItems && (
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => onChange([...value, { key: createKey(), value: '', prefix: '', suffix: '', label: '', icon: '' }])}
        >
          <Plus size={16} /> Add metric
        </button>
      )}
      {errors?.metrics && <p className="text-xs font-medium text-red-500">{errors.metrics[0]}</p>}
    </div>
  );
}
