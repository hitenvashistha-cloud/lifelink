export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className="skeleton h-4 w-24 mb-3"></div>
          <div className="skeleton h-8 w-16"></div>
        </div>
        <div className="skeleton w-14 h-14 rounded-xl"></div>
      </div>
    </div>
  );
}

export function SkeletonListItem() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="skeleton w-12 h-12 rounded-xl"></div>
        <div className="flex-1">
          <div className="skeleton h-4 w-32 mb-2"></div>
          <div className="skeleton h-3 w-24"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="skeleton h-3 w-full"></div>
        <div className="skeleton h-3 w-3/4"></div>
      </div>
      <div className="skeleton h-10 w-full rounded-lg"></div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="skeleton h-5 w-40 mb-6"></div>
      <div className="skeleton h-64 w-full"></div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="skeleton h-4 w-32"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-50 flex items-center gap-4">
          <div className="skeleton w-10 h-10 rounded-full"></div>
          <div className="flex-1">
            <div className="skeleton h-3 w-32 mb-2"></div>
            <div className="skeleton h-3 w-48"></div>
          </div>
          <div className="skeleton h-6 w-16 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="skeleton h-32 w-full rounded-2xl mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </div>
    </div>
  );
}