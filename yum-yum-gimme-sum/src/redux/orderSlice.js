import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    eta: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.orderNumber = action.payload.orderNumber;
      state.eta = action.payload.eta;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;