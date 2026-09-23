import { z } from 'zod';
import { iconField, metricFields, requiredText } from './common';

export const skillSchema = z.object({
  name: requiredText('Name', 60),
  icon: iconField,
});

export const serviceSchema = z.object({
  title: requiredText('Title', 80),
  description: requiredText('Description', 300),
  icon: iconField,
});

export const experienceSchema = z.object({
  role: requiredText('Role', 80),
  company: requiredText('Company', 80),
  period: requiredText('Period', 40),
  description: requiredText('Description', 500),
});

export const siteMetricSchema = z.object(metricFields);

export type SkillInput = z.infer<typeof skillSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type SiteMetricInput = z.infer<typeof siteMetricSchema>;
