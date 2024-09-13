import ProductPage from "@/components/template/desktop/ProductPage";
import { isMobile } from "@/lib/isMobile";
import { getProduct, getSeller } from "@/service/products";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type ProductProps = {
  params: {
    id: string;
  };
};

const Product = async ({ params }: ProductProps) => {
  const product = await getProduct(params.id);
  const seller = await getSeller(params.id);
  console.log(seller);
  if (product.error?.status === 404) {
    notFound();
  }

  return <ProductPage detailProduct={product.data} seller={seller} />;
};

export default Product;
