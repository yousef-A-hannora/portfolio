type ContactItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

export function ContactItem({ icon, label, value, href }: ContactItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-gray-900 font-semibold hover:text-orange-500 transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-sm text-gray-900 font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
