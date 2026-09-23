import { icons, type LucideProps } from 'lucide-react';

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

export function isIconName(name: string): name is IconName {
  return Object.prototype.hasOwnProperty.call(icons, name);
}

type IconProps = LucideProps & { name: string };

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = isIconName(name) ? icons[name] : icons.Circle;
  return <LucideIcon aria-hidden="true" {...props} />;
}
