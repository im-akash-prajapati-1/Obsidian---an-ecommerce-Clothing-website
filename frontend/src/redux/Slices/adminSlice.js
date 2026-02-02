import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ROUTE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`;

//  Async thunk to fetch all users (ADMIN Only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(API_ROUTE_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data;
});

// Add the create user actions
export const addUser = createAsyncThunk(
  "order/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ROUTE_URL, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// thunk to Update user Info
export const updateUser = createAsyncThunk(
  "order/updateUser",
  async ({ id, name, email, role }) => {
    const response = await axios.put(
      `${API_ROUTE_URL}/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

// thunk to Delete a` user
export const deleteUser = createAsyncThunk("order/deleteUser", async (id) => {
  await axios.delete(`${API_ROUTE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id,
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
