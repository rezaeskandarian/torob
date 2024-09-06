import { getCategoryProduct, getIdCategory } from "@/service/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  stock_status?: string;
  available?: boolean;
  shop_type?: string;
  sort?: string;
  greaterthan?: number;
  lessthan?: number;
  q?: string;
}

interface categoryIdProps {
  mainId?: string | number | null;
  midId?: string | number | null;
  subId?: string | number | null;
}

interface InitialStateProps {
  products: any[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  params: string;
  min: string;
  max: string;
  page: string;
  search: string;
  categoryId: categoryIdProps;
}

const initialState: InitialStateProps = {
  products: [],
  loading: false,
  error: null,
  filters: {},
  params: "",
  min: "",
  max: "",
  page: "",
  search: "",
  categoryId: {},
};

export const fetchProduct = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const state = getState() as { products: InitialStateProps };
    const filters = state.products.filters;
    const paramsId = state.products.params;
    const page = state.products.page;
    const search = state.products.search;
    const result = await getCategoryProduct(paramsId, filters, page, search);
    return result;
  }
);

export const fetchIdCategory = createAsyncThunk(
  "products/fetchIdCategory",
  async (_, { getState }) => {
    let paramsId;
    let result;
    const state = getState() as { products: InitialStateProps };
    const page = state.products.page;

    if (page === "product") {
      paramsId = state.products.categoryId.subId?.toString() || "";
      console.log(paramsId);
      result = await getIdCategory(paramsId, page);
    } else {
      paramsId = state.products.params;
      result = await getIdCategory(paramsId, page);
    }
   

    return result;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addParam: (state, action: PayloadAction<string>) => {
      state.params = action.payload;
    },
    addSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setId: (
      state,
      action: PayloadAction<{ key: keyof categoryIdProps; value: any }>
    ) => {
      const { key, value } = action.payload;
      state.categoryId[key] = value;
    },
    removeId: (state: any, action: any) => {
      delete state.categoryId[action.payload];
    },
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof Filters; value: any }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    removeFilter: (state, action: PayloadAction<keyof Filters>) => {
      delete state.filters[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload?.data;
      state.min = action.payload?.min;
      state.max = action.payload?.max;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ||
        "دریافت اطلاعات با موفقیت انجام نشد دوباره تلاش کنید ";
    });

    // Handle fetchIdCategory
    builder.addCase(fetchIdCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIdCategory.fulfilled, (state, action) => {
      if (state.page === "mid") {
        state.categoryId.mainId =
          action.payload.data.attributes?.main_category?.data.id;
      } else if (state.page === "sub") {
        state.categoryId.midId =
          action.payload.data.attributes?.mid_category?.data.id;
        state.categoryId.mainId =
          action.payload.data.attributes?.mid_category?.data.attributes.main_category.data.id;
      } else if (state.page === "product") {
        state.categoryId.midId =
          action.payload.data.attributes?.mid_category?.data.id;
        state.categoryId.mainId =
          action.payload.data.attributes?.mid_category?.data.attributes.main_category.data.id;
      }
    });

    builder.addCase(fetchIdCategory.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch category ID";
    });
  },
});

export const {
  setFilter,
  removeFilter,
  addParam,
  setPage,
  addSearch,
  setId,
  removeId,
} = productSlice.actions;

export default productSlice.reducer;
