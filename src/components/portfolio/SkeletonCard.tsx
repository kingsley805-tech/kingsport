export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      {/* Preview skeleton */}
      <div className="aspect-video skeleton" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-6 w-3/4 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-4 w-2/3 skeleton rounded" />
        
        {/* Tech badges skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-16 skeleton rounded-full" />
          <div className="h-6 w-20 skeleton rounded-full" />
          <div className="h-6 w-14 skeleton rounded-full" />
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex gap-3">
          <div className="flex-1 h-10 skeleton rounded-lg" />
          <div className="flex-1 h-10 skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}
