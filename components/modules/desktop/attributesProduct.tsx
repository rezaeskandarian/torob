import Image from "next/image";
import emptySpecs from "@/public/image-desktop/empty_specs.png";

const AttributesProduct = ({ keymain, keysub }: any) => {
  const isKeymainArray = Array.isArray(keymain);
  const isKeySubArray = Array.isArray(keysub);
  const convertToArray = (keymain: any, keysub: any) => {
    if (keymain) {
      const keymainEntries = isKeymainArray ? keymain : Object.entries(keymain);
      return keymainEntries;
    }
    if (keysub) {
      const keysubEntries = isKeySubArray ? keysub : Object.entries(keysub);
      return keysubEntries;
    }
  };
  const keymainEntries = convertToArray(keymain, null);
  const keysubEntries = convertToArray(null, keysub);


  return (
    <>
    <div className="overflow-auto custom-overflow" >
      <h3 className="font-bold text-xl my-3 p-2  mr-4">مشخصات محصول</h3>
      <div className=" p-2  mr-4 overflow-auto overscroll-contain custom-overflow ">
        <div className="overflow-y-auto">
          {keymainEntries && (
            <h3 className="font-bold text-base my-3">مشخصات کلیدی</h3>
          )}

          {!keymainEntries && !keysubEntries ? (
            <>
              <Image
                src={emptySpecs}
                alt="هیچ مشخصاتی موجود نیست"
                width={300}
                height={300}
                className="m-auto"
              />
              <p className="text-center text-gray-500 text-sm py-2">
                {" "}
                هیچ مشخصاتی برای این محصول موجود نیست
              </p>
            </>
          ) : null}
          {isKeymainArray && keymainEntries?.length > 0
            ? keymainEntries?.map((item: any, index: any) => (
                <div key={index}>
                  {Object.entries(item).map(([key, value]: any) => (
                    <div key={key} className="grid grid-cols-4">
                      <span className="col-span-2">{key}</span>
                      <span className="col-span-2">{value}</span>
                    </div>
                  ))}
                </div>
              ))
            : keymainEntries?.map(([key, value]: any[], index: any) => (
                <div
                  key={key}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } grid grid-cols-4 p-1 rounded-sm `}
                >
                  <span className="col-span-2 text-sm">{key}</span>
                  <span className="col-span-1 text-sm">{value}</span>
                </div>
              ))}
          <hr />
          {keysubEntries && (
            <h3 className="font-bold text-base my-3">مشخصات کلی</h3>
          )}

          {isKeySubArray && keysubEntries?.length > 0
            ? keysubEntries?.map((item: any, index: any) => (
                <div key={index}>
                  {Object.entries(item).map(([key, value]: any) => (
                    <div key={key} className=" p-1 py-2 ">
                      <p className=" block font-bold text-base">{key}</p>
                      <p className=" text-sm block py-1">{value}</p>
                    </div>
                  ))}
                </div>
              ))
            : keysubEntries?.map(([key, value]: any[], index: any) => (
                <div key={key} className=" p-1 py-2 ">
                  <p className=" block font-bold text-base">{key}</p>
                  <p className=" text-sm block py-1">{value}</p>
                </div>
              ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default AttributesProduct;
