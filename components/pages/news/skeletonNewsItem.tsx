import React from "react";

const SkeletonNewsItem: React.FC = () => {
  return (
    
      <div className="flex animate-pulse">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="w-2/3 flex items-center justify-end">
          <div className="bg-gray-300 w-64 h-36 rounded"></div>
        </div>
      </div>
    
  );
};

export default SkeletonNewsItem;
