const SkeletonTimeSelect: React.FC = () => {
  return (
    <div className="mb-2 mt-4 flex items-center justify-between w-full animate-pulse">
      <div className="block bg-gray-300 h-4 w-24 rounded text-gray-700 text-sm font-bold"></div>
      <div className="flex items-center mt-5 space-x-2">
        <div className="shadow bg-gray-300 appearance-none border rounded w-11 h-10 px-4 leading-tight focus:outline-none focus:shadow-outline"></div>
        <div className="shadow bg-gray-300 appearance-none border rounded w-11 h-10 px-4 leading-tight focus:outline-none focus:shadow-outline"></div>
      </div>
    </div>
  );
};

const SkeletonCrontabConfig: React.FC = () => {
  return (
    <div className="max-w-full p-8 text-black animate-pulse">
      <h2 className="text-2xl font-bold mb-6 bg-gray-300 h-6 w-2/3 rounded"></h2>
      <div className="flex flex-row mb-10">
        <div className="m-4 bg-gray-300 h-4 w-24 rounded"></div>
        <div className="m-4 bg-gray-300 h-4 w-24 rounded"></div>
        <div className="m-4 bg-gray-300 h-4 w-24 rounded"></div>
        <div className="m-4 bg-gray-300 h-4 w-24 rounded"></div>
        <div className="m-4 bg-gray-300 h-4 w-24 rounded"></div>
      </div>
      <div className="flex w-2/5 rounded shadow ml-16">
        <div className="flex flex-col">
          <div className="bg-gray-300 w-1/6 p-8 rounded-l-lg h-full"></div>
        </div>

        <div className="flex flex-col w-full p-9">
          <h1 className="mb-5 font-bold text-xl bg-gray-300 h-6 w-1/2 rounded"></h1>
          <div className="divide-y mt-2 mb-4 space-y-4">
            <SkeletonTimeSelect />
            <SkeletonTimeSelect />
            <SkeletonTimeSelect />
            <SkeletonTimeSelect />
          </div>
          <div className="flex justify-start">
            <div className="mt-5 px-4 py-2 border rounded text-black border-black bg-gray-300 h-10 w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCrontabConfig;
