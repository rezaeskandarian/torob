"use server";
const getCategory = async () => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/categories?populate[mid_categories][populate]=sub_categories&fields=id&fields=name&populate[mid_categories][fields]=id&populate[mid_categories][fields]=name`,
      {
        method: "GET",
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود"); // Data retrieval failed
  }
};

const getSingleMainCategory = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/categories/${id}/?populate[mid_categories][fields][0]=id&populate[mid_categories][fields][1]=name&fields[0]=id&fields[1]=name`,
      {
        method: "GET",
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      return 'There was an error.'
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود");
 
    
    // Data retrieval failed
  }
};

const getSingleMidCategory = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/mid-categories/${id}?populate[sub_categories][fields][0]=id&populate[sub_categories][fields][1]=name&fields[0]=id&fields[1]=name`,
      {
        method: "GET",
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود"); // Data retrieval failed
  }
};

const getSingleSubCategory = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/sub-categories/${id}?populate[fields][0]=id&populate[sub_categories][fields][1]=name&fields[0]=id&fields[1]=name`,
      {
        method: "GET",
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود"); // Data retrieval failed
  }
};

const getSubPopulateMid = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/sub-categories/${id}?populate=mid_category`,
      {
        method: "GET",
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود"); // Data retrieval failed
  }
};

const getMidPopulateMain = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL_API}/api/mid-categories/${id}?populate=main_category`,
      {
        method: "GET",
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("دریافت اطلاعات ناموفق بود"); // Data retrieval failed
  }
};

export {
  getCategory,
  getSingleMainCategory,
  getSingleMidCategory,
  getSingleSubCategory,
  getSubPopulateMid,
  getMidPopulateMain,
};
