import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderApi } from "../services/apiService"; // 🔹 Uppdaterad import


export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await placeOrderApi(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    eta: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.id;
        state.eta = action.payload.order.eta;
        state.status = "succeeded";
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;