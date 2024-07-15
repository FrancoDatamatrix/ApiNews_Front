import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const SkeletonUserItem: React.FC = () => {
  return (
    <div className="flex border rounded-lg shadow-md h-64 text-sm text-gray-600 animate-pulse">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center h-full justify-center">
          <UserIcon className="w-28 text-gray-300" />
          <div className="w-32 h-6 bg-gray-300 mt-4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserItem;
