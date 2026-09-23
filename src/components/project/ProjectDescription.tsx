type ProjectDescriptionProps = {
  description: string;
};

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  const paragraphs = description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">About the Project</h2>
      <div className="h-1 w-12 bg-orange-500 rounded-full mb-6"></div>
      <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
