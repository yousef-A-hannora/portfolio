import { z } from 'zod';
import { isIconName } from '@/components/ui/Icon';

export const requiredText = (label: string, max = 200) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`);

export const iconField = z
  .string({ required_error: 'Icon is required' })
  .trim()
  .min(1, 'Icon is required')
  .refine(isIconName, 'Choose a valid icon');

export const metricFields = {
  value: z.preprocess(
    (value) => (typeof value === 'string' ? (value.trim() === '' ? undefined : Number(value)) : value),
    z
      .number({ required_error: 'Value is required', invalid_type_error: 'Value must be a number' })
      .int('Value must be a whole number')
      .min(0, 'Value must be 0 or more')
      .max(2_000_000_000, 'Value is too large'),
  ),
  prefix: z.string().trim().max(20, 'Prefix must be at most 20 characters').default(''),
  suffix: z.string().trim().max(20, 'Suffix must be at most 20 characters').default(''),
  label: requiredText('Label', 80),
  icon: iconField,
};

export const idSchema = z.string().min(1);
export const directionSchema = z.enum(['up', 'down']);
