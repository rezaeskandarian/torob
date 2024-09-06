export type SingleMainCategoryProps = {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      name: string;
      data: any;
    };
    mid_categories: MidCategoryProps[] | any;
  };
};

export type MainCategoryProps = {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      name: string;
    };
  };
};

export type MidCategoryProps = {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      main_category: MainCategoryProps[] | any;
    };
  };
};

export type SubCategoryProps = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    mid_category: MidCategoryProps[] | any;
  };
};

export type detailProductProps = {
  detailProduct: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      shop_offline: boolean;
      available: boolean;
      stock_status: string;
      location: string;
      sub_category: SubCategoryProps[] | any;
      image: [] | any;
      keymain: {} | any;
      keysub: {} | any;
    };
    meta: {} | any;
  };
  seller: any;
};
