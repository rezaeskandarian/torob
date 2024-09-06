"use server";

const getProduct = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/products/${id}?populate[0]=sub_category.mid_category.main_category&populate[1]=image`,
      {
        method: "GET",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

const getSeller = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/products/${id}?fields[0]=id&populate[prices][populate]=seller`,
      {
        method: "GET",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

const getLessDetailProduct = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/products/${id}?fields=name`,
      {
        method: "GET",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

const getCategoryProduct = async (
  id: any,
  filters: any,
  page: string,
  search: string
) => {
  let url = "";

  if (page === "main") {
    url = `${process.env.BASE_URL_API}/api/products?filters[sub_category][mid_category][main_category][id][$eq]=${id}&populate[prices][fields][0]=id&populate[image][fields][0]=id&populate[image][fields][1]=url&fields[2]=shop_offline&fields[3]=available&fields[4]=stock_status&fields[5]=location&fields[6]=price&fields[7]=name`;
  } else if (page === "mid") {
    url = `${process.env.BASE_URL_API}/api/products?filters[sub_category][mid_category][id][$eq]=${id}&populate[prices][fields][0]=id&populate[image][fields][0]=id&populate[image][fields][1]=url&fields[2]=shop_offline&fields[3]=available&fields[4]=stock_status&fields[5]=location&fields[6]=price&fields[7]=name`;
  } else if (page === "sub") {
    url = `${process.env.BASE_URL_API}/api/products?filters[sub_category][id][$eq]=${id}&populate[prices][fields][0]=id&populate[image][fields][0]=id&populate[image][fields][1]=url&fields[2]=shop_offline&fields[3]=available&fields[4]=stock_status&fields[5]=location&fields[6]=price&fields[7]=name`;
  } else if (page === "search") {
    url = `${process.env.BASE_URL_API}/api/products?filters[name][$contains]=${search}&populate[prices][fields][0]=id&populate[image][fields][0]=id&populate[image][fields][1]=url&fields[2]=shop_offline&fields[3]=available&fields[4]=stock_status&fields[5]=location&fields[6]=price&fields[7]=name`;
  } else {
    return null;
  }

  let sortApplied = false;

  for (const [key, value] of Object.entries(filters)) {
    if (key === "shop_type" && value === "offline") {
      url += `&filters[shop_offline][$eq]=true`;
    }
    if (key === "available" && value === true) {
      url += `&filters[available][$eq]=true`;
    }
    if (key === "stock_status") {
      url += `&filters[stock_status][$eq]=${value}`;
    }
    if (key === "greaterthan") {
      url += `&filters[price][$gte]=${value}`;
    }
    if (key === "lessthan") {
      url += `&filters[price][$lte]=${value}`;
    }
    if (key === "lessthan") {
      url += `&filters[name][$contains]=`;
    }
    if (key === "sort") {
      sortApplied = true;
      if (value === "-price") {
        url += "&sort[price]=asc";
      } else if (value === "price") {
        url += "&sort[price]=desc";
      } else if (value === "date") {
        url += `&sort[createdAt]=desc`;
      }
    }
  }

  try {
    // Fetch main product data
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    let minPrice = null;
    let maxPrice = null;

    if (!sortApplied) {
      // Fetch min price
      const minResponse = await fetch(
        `${url}&sort[price]=asc&pagination[limit]=1`,
        {
          method: "GET",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        }
      );
      const minData = await minResponse.json();

      // Fetch max price
      const maxResponse = await fetch(
        `${url}&sort[price]=desc&pagination[limit]=1`,
        {
          method: "GET",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        }
      );
      const maxData = await maxResponse.json();

      minPrice = minData.data?.length ? minData.data[0].attributes.price : null;
      maxPrice = maxData.data?.length ? maxData.data[0].attributes.price : null;
    } else {
      if (
        filters.sort === "-price" ||
        filters.sort === "price" ||
        filters.sort === "date"
      ) {
        const removeNprice = "&sort[price]=asc";
        const removeHprice = "&sort[price]=desc";
        const removeDate = "&sort[createdAt]=desc";

        url = url.replace(removeNprice, "");
        url = url.replace(removeHprice, "");
        url = url.replace(removeDate, "");

        const minResponse = await fetch(
          `${url}&sort[price]=asc&pagination[limit]=1`,
          {
            method: "GET",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
          }
        );
        const minData = await minResponse.json();

        // Fetch max price
        const maxResponse = await fetch(
          `${url}&sort[price]=desc&pagination[limit]=1`,
          {
            method: "GET",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
          }
        );
        const maxData = await maxResponse.json();

        minPrice = minData.data?.length
          ? minData.data[0].attributes.price
          : null;
        maxPrice = maxData.data?.length
          ? maxData.data[0].attributes.price
          : null;
      }
    }

    return {
      data,
      min: minPrice,
      max: maxPrice,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

const getIdCategory = async (paramsId: string | number, page: string) => {
  let url;

  if (page === "mid") {
    url = `${process.env.BASE_URL_API}/api/mid-categories/${paramsId}?populate=main_category`;
  } else if (page === "sub") {
    url = `${process.env.BASE_URL_API}/api/sub-categories/${paramsId}?populate=mid_category.main_category`;
  } else if (page === "product") {
    url = `${process.env.BASE_URL_API}/api/sub-categories/${paramsId}?populate=mid_category.main_category`;
  } else {
    return null;
  }
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

export {
  getProduct,
  getSeller,
  getCategoryProduct,
  getLessDetailProduct,
  getIdCategory,
};
