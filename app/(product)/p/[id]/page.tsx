
import { getLessDetailProduct } from "@/service/products";
import { redirect } from "next/navigation";

type ProductBrowseProps = {
  params: { id: string };
};

const RedirectToProduct = async ({ params }: ProductBrowseProps) => {
  const nameCategory = await getLessDetailProduct(params.id);
  console.log(nameCategory);

  if (nameCategory?.data?.attributes?.name) {
    const Name = encodeURIComponent(
      nameCategory.data.attributes.name.toLowerCase().replace(/\s+/g, "-")
    );
    console.log(`Redirecting to /p/${params.id}/${Name}`);
    redirect(`/p/${params.id}/${Name}`);
    return null; // Ensure the component does not render after redirect
  }
  if (nameCategory?.error?.status === 404) {
    const firstCategory = await getLessDetailProduct("1");
    const firstCategoryName = encodeURIComponent(
      firstCategory?.data?.attributes?.name.toLowerCase().replace(/\s+/g, "-")
    );
    console.log(`Redirecting to /p/${firstCategoryName}`);
    redirect(`/p/1/${firstCategoryName}`);
    return null; // Ensure the component does not render after redirect
  }
};

export default RedirectToProduct;