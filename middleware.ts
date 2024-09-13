import { NextResponse } from "next/server";
import {
  getSingleMainCategory,
  getSingleMidCategory,
  getSingleSubCategory,
} from "@/service/getCategory";


async function handleCategoryRedirect(
  req: Request,
  url: URL,
  id: string,
  categoryName: string,
  getCategory: (id: string) => Promise<any>,
  basePath: string
) {


  const nameCategory = await getCategory(id);

  if (nameCategory.data === null && !url.pathname.includes(`${basePath}/1`)) {
    return NextResponse.redirect(new URL(`${basePath}/1`, req.url));
  }

  if (!nameCategory?.data || !nameCategory?.data?.attributes) {
    return NextResponse.redirect(new URL(`${basePath}/1`, req.url));
  }

  const formattedCategoryName = nameCategory.data?.attributes.name
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  if (!formattedCategoryName) {
    return NextResponse.redirect(new URL(`${basePath}/1`, req.url));
  }

  if (formattedCategoryName !== categoryName) {
    const encodedCategoryName = encodeURIComponent(formattedCategoryName);
    const destinationPath = `${basePath}/${id}/${encodedCategoryName}`;
    if (url.pathname !== destinationPath) {
      return NextResponse.redirect(new URL(destinationPath, req.url));
    }
  }

  if (nameCategory?.error?.status === 404) {
    const firstCategory = await getSingleMainCategory("1");
    const firstCategoryName = encodeURIComponent(
      firstCategory?.data?.attributes?.name.toLowerCase().replace(/\s+/g, "-")
    );
    return NextResponse.redirect(
      new URL(`${basePath}/1/${firstCategoryName}`, req.url)
    );
  }

  return NextResponse.next();
}

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3];

  const categoryName = url.pathname.split("/")[4];

  const pathname = url.pathname;

  if (!pathname.startsWith("/browse")) {
    return NextResponse.next();
  }

  if (pathname === "/browse") {
    return NextResponse.redirect(new URL(`/browse/main/1/`, req.url));
  }
  if (pathname.startsWith("/browse/main")) {
    return handleCategoryRedirect(
      req,
      url,
      id,
      categoryName,
      getSingleMainCategory,
      "/browse/main"
    );
  }

  if (pathname.startsWith("/browse/mid")) {
    return handleCategoryRedirect(
      req,
      url,
      id,
      categoryName,
      getSingleMidCategory,
      "/browse/mid"
    );
  }

  if (pathname.startsWith("/browse/sub")) {
    return handleCategoryRedirect(
      req,
      url,
      id,
      categoryName,
      getSingleSubCategory,
      "/browse/sub"
    );
  }

  return NextResponse.next();
}
