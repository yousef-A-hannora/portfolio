'use client';

import type { FieldErrors } from '@/lib/action-result';
import { Field } from './Field';
import { IconPicker } from './IconPicker';
import { inputClass } from './styles';

export type MetricFormValue = {
  value: string;
  prefix: string;
  suffix: string;
  label: string;
  icon: string;
};

type MetricFieldsProps = {
  idPrefix: string;
  value: MetricFormValue;
  onChange: (value: MetricFormValue) => void;
  errors?: FieldErrors;
  errorPrefix?: string;
};

export function MetricFields({ idPrefix, value, onChange, errors, errorPrefix = '' }: MetricFieldsProps) {
  const err = (name: keyof MetricFormValue) => errors?.[`${errorPrefix}${name}`];
  const set = (name: keyof MetricFormValue, fieldValue: string) => onChange({ ...value, [name]: fieldValue });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
      <Field label="Number" htmlFor={`${idPrefix}-value`} error={err('value')} className="lg:col-span-2">
        <input
          id={`${idPrefix}-value`}
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          value={value.value}
          onChange={(event) => set('value', event.target.value)}
          className={inputClass}
          placeholder="100"
        />
      </Field>
      <Field label="Prefix" htmlFor={`${idPrefix}-prefix`} error={err('prefix')} className="lg:col-span-2">
        <input
          id={`${idPrefix}-prefix`}
          type="text"
          value={value.prefix}
          onChange={(event) => set('prefix', event.target.value)}
          className={inputClass}
          placeholder="Optional"
          maxLength={20}
        />
      </Field>
      <Field label="Suffix" htmlFor={`${idPrefix}-suffix`} error={err('suffix')} className="lg:col-span-2">
        <input
          id={`${idPrefix}-suffix`}
          type="text"
          value={value.suffix}
          onChange={(event) => set('suffix', event.target.value)}
          className={inputClass}
          placeholder="+, K+, %"
          maxLength={20}
        />
      </Field>
      <Field label="Label" htmlFor={`${idPrefix}-label`} error={err('label')} className="lg:col-span-3">
        <input
          id={`${idPrefix}-label`}
          type="text"
          value={value.label}
          onChange={(event) => set('label', event.target.value)}
          className={inputClass}
          placeholder="Active users"
          maxLength={80}
        />
      </Field>
      <Field label="Icon" htmlFor={`${idPrefix}-icon`} error={err('icon')} className="lg:col-span-3">
        <IconPicker id={`${idPrefix}-icon`} value={value.icon} onChange={(icon) => set('icon', icon)} invalid={!!err('icon')} />
      </Field>
    </div>
  );
}
