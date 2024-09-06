import MainHeader from "@/components/layouts/desktop/MainHeader";
import { getProduct } from "@/service/products";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product?.data || !product?.data?.attributes) {
    return {
      title: "دسته بندی پیدا نشد دوباره امتحان کنید",
    };
  }

  let today = new Date().toLocaleDateString("fa-IR");

  return {
    title: ` قیمت ${product?.data?.attributes?.name} امروز , ${today} | ترب`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
