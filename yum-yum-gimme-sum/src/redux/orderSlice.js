import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiKey } from "../api/api";

const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

// Async thunk för att lägga en order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // Hämta API-nyckeln dynamiskt
      const apiKey = await getApiKey();

      
      const tenantId = localStorage.getItem("tenantId") || "SimonFoodTruck";
      console.log("Skickar order med items:", orderData.items);
      console.log("Använder tenant:", tenantId);

      
      const itemIds = orderData.items.flatMap(item =>
        Array(item.quantity).fill(item.id)
      );
      console.log("Skickar order med itemIds:", itemIds);

      
      const response = await fetch(`${API_BASE_URL}/${tenantId}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
        body: JSON.stringify({
          items: itemIds
        }),
      });

      if (!response.ok) {
        console.log("Status code:", response.status);
        const errorText = await response.text();
        console.log("Error text from server:", errorText);
        throw new Error("Order kunde inte läggas");
      }

      const data = await response.json();
      // API:et returnerar förväntat { orderNumber, eta, ... }
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
        state.orderNumber = action.payload.orderNumber;
        state.eta = action.payload.eta;
        state.status = "succeeded";
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;