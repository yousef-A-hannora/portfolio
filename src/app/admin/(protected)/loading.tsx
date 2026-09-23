export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 rounded-lg bg-gray-200" />
      <div className="h-1 w-12 rounded-full bg-orange-200" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 rounded-2xl bg-white border border-gray-100" />
        ))}
      </div>
    </div>
  );
}
