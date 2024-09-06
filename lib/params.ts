import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useParamManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const modifyParam = (key: string, value?: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (value) {
      currentParams.set(key, value); // Add or update parameter
    } else {
      currentParams.delete(key); // Remove parameter if value is undefined
    }

    router.push(`${pathname}?${currentParams.toString()}`);
  };

  const addParam = (key: string, value: string) => modifyParam(key, value);
  const removeParam = (key: string) => modifyParam(key);

  // Function to add multiple parameters at once
  const addMultipleParams = (params: { key: string; value: string }[]) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    params.forEach(({ key, value }) => {
      currentParams.set(key, value);
    });

    router.push(`${pathname}?${currentParams.toString()}`);
  };

  // Function to remove multiple parameters at once
  const removeMultipleParams = (keys: string[]) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    keys.forEach((key) => {
      currentParams.delete(key);
    });

    router.replace(`${pathname}?${currentParams.toString()}`);
  };

  return { addParam, removeParam, addMultipleParams, removeMultipleParams };
};

export { useParamManager };