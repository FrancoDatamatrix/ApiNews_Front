import React from "react";
import {
  ClockIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const SkeletonScheduleItem: React.FC = () => {
  return (
    <div className="flex border rounded-lg shadow-md h-64 text-sm text-gray-600 animate-pulse">
      <div className="bg-gray-300 w-1/6 h-full rounded-l-lg text-white flex flex-col items-center justify-center">
        <ClockIcon className="w-6 mb-3" />
        <DocumentTextIcon className="w-6 mb-3" />
        <ChatBubbleLeftRightIcon className="w-6 mb-3" />
        <MapPinIcon className="w-6 mb-3" />
      </div>
      <div className="flex flex-col w-full ml-2 font-sans text-base">
        <div className="flex flex-col h-full mb-3 justify-center space-y-3">
          <div className="flex">
            <div className="bg-gray-300 m-1 h-4 w-3/4 rounded"></div>
          </div>
          <div className="flex">
            <div className="bg-gray-300 m-1 h-4 w-3/4 rounded"></div>
          </div>
          <div className="flex">
            <div className="bg-gray-300 m-1 h-4 w-3/4 rounded"></div>
          </div>
          <div className="flex">
            <div className="bg-gray-300 m-1 h-4 w-3/4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonScheduleItem;
