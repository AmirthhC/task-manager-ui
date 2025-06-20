export const SkeletonTaskCard = () => (
  <div className="grid grid-cols-5 items-center px-6 py-4 text-sm text-gray-700 border-t min-w-[600px] animate-pulse gap-4">
    <div className="h-4 bg-gray-200 rounded w-24"></div>
    <div className="h-4 bg-gray-200 rounded w-40"></div>
    <div className="h-4 bg-gray-200 rounded w-20"></div>
    <div className="h-6 bg-gray-200 rounded-full w-28"></div>
    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
  </div>
);
