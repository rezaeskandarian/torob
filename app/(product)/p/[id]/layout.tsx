import MainHeader from "@/components/layouts/desktop/MainHeader";
import { isMobile } from "@/lib/isMobile";
import { getProduct } from "@/service/products";
import { headers } from "next/headers";

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
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);
  return (
    <>
      {mobileCheck === false && <MainHeader />}
      {children}
    </>
  );
}
