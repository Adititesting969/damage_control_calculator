'use client';

const LoadingSkeleton = () => {
  return (
    <div className="w-full bg-card rounded-2xl p-6 border border-border animate-pulse-soft">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-8 bg-muted rounded w-1/2" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4]?.map((item) => (
            <div key={item} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-muted rounded w-1/4" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;