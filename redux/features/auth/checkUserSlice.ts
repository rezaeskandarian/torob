import { getMe } from "@/service/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const checkUser = createAsyncThunk("auth/checkUser", async () => {
  try {
    const user = await getMe();

    return user;
  } catch (error) {
    throw new Error("احراز هویت نشده اید");
  }
});

const checkUserSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default checkUserSlice.reducer;
export const {logout} = checkUserSlice.actions;
export { checkUser };
