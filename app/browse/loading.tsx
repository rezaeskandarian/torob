import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex">
      <div className="min-w-[390px] overflow-y-auto custom-overflow h-svh sticky top-0">
        <div className="border-b py-3  pr-5">
          <Skeleton className="h-4 w-auto mb-4 ml-2 " />
          <Skeleton className="h-4 w-auto mb-4 mr-2 ml-2 " />
          <Skeleton className="h-4 w-auto mb-4 mr-4 ml-2" />
          <Skeleton className="h-4 w-auto mb-4 mr-6 ml-2" />
        </div>
        <div className="border-b py-3  pr-5">
            <div className="flex w-full my-2">
          <Skeleton className="h-10 w-3/4 mx-4" />
          <Skeleton className="h-10 w-1/4 mx-2" />
          </div>
          <div className="flex w-full my-2">
          <Skeleton className="h-10 w-3/4 mx-4" />
          <Skeleton className="h-10 w-1/4 mx-2" />
          </div>
        </div>
        <div className="border-b py-3  pr-5">
          <Skeleton className="h-10 w-auto mx-4" />
        
        </div>
        <div className="border-b py-3  pr-5">
          <Skeleton className="h-6 w-auto mx-2 my-5" />
          
        </div>
        <div className="border-b py-3  pr-5">
          <Skeleton className="h-4 w-auto mx-2 my-2 " />
          <Skeleton className="h-4 w-auto   mx-2 my-2" />
          <Skeleton className="h-4 w-auto  mx-2 my-2" />
          <Skeleton className="h-4 w-auto  mx-2 my-2" />
        </div>
      </div>

      <div className="bg-medium-gray border-r w-full px-8">
        {/* Skeleton for Breadcrumb */}
        <div className="bg-white flex  w-[fit-content] px-3 py-2 my-2 rounded">
          <Skeleton className="h-4 w-64 mb-2 mx-2" />
          <Skeleton className="h-4 w-48 mb-2 mx-2" />
          <Skeleton className="h-4 w-32 mx-2" />
        </div>

        {/* Skeleton for Title */}
        <div className=" bg-white border-t w-[fit-content] rounded p-2 my-2">
          <Skeleton className="h-5 w-48 m-2" />
        </div>

        {/* Skeleton for FilterBrowse */}
        <div className=" bg-white w-[fit-content] flex p-2 py-2 my-2 items-center">
          <Skeleton className="h-4   mx-2 w-64 " />
          <Skeleton className="h-4   mx-2 w-64" />
          <Skeleton className="h-4  mx-2 w-36" />
        </div>

        {/* Skeleton for ProductCard */}
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {[...Array(14)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-2 flex flex-col justify-between"
            >
              <div>
                <Skeleton className="w-full h-40 py-1" />
              </div>
              <div className="my-1">
                <Skeleton className="w-full h-8 mb-2" />
                <Skeleton className="w-3/4 h-12" />
              </div>
              <div className="flex mt-2 mb-11">
                <Skeleton className="w-16 h-4 mr-2 py-1" />
                <Skeleton className="w-16 h-4 py-1" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="w-16 h-4 py-1" />
                <Skeleton className="w-16 h-4 py-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
