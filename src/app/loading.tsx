export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="flex items-center gap-3 text-navy-500">
        <span className="size-2.5 animate-bounce rounded-full bg-gold-500 [animation-delay:-0.3s]" />
        <span className="size-2.5 animate-bounce rounded-full bg-royal-500 [animation-delay:-0.15s]" />
        <span className="size-2.5 animate-bounce rounded-full bg-navy-900" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
