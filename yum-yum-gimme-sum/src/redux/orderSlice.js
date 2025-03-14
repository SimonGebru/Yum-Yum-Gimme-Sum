// Hanterar beställning, placeorder skickar en beställning till api. SParar ordernr och eta.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderApi, fetchReceipt } from "../services/apiService";

// Skickar order till API
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

// Hämtar kvitto från API
export const fetchReceiptData = createAsyncThunk(
  "order/fetchReceiptData",
  async (orderId, { rejectWithValue }) => {
    try {
      const receipt = await fetchReceipt(orderId);
      return receipt;
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
    receipt: null,
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
      })
      .addCase(fetchReceiptData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReceiptData.fulfilled, (state, action) => {
        state.receipt = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchReceiptData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;