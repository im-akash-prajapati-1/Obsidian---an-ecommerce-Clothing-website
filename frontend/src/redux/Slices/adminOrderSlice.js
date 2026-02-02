import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ROUTE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;

//  Async thunk to fetch all orders (ADMIN only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrder/fetchAllOrders",
  async (sort = "recent", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders?sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Async thunk to Update Order Status (ADMIN only)
export const updateOrderstatus = createAsyncThunk(
  "adminOrders/updateOrderstatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ROUTE_URL}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

//  Async thunk to Delete Order (ADMIN only)
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_ROUTE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch All orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // calculate total sales
        state.totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0,
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // handle update Order status
      .addCase(updateOrderstatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;        
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      // handle delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload,
        );
      });
  },
});

export default adminOrderSlice.reducer;
