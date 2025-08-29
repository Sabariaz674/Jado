import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { savePassengerApi } from "../../api/passengers"; // <-- use helper

// --- helpers (as-is) ---
const getGuestId = () => {
  let id = localStorage.getItem("guestId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("guestId", id);
  }
  return id;
};

const pickMongoId = (u) => {
  const id = u?._id;
  return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id) ? id : null;
};

// --- thunk ---
export const savePassenger = createAsyncThunk(
  "passenger/save",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth?.user || {};
      const userId = pickMongoId(user) || getGuestId();
      const userEmail = user?.email ?? null;

      // API helper call
      await savePassengerApi({ ...payload, userId, userEmail });
      return null;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to save passenger";
      return rejectWithValue({ message });
    }
  }
);

// --- slice ---
const passengerSlice = createSlice({
  name: "passenger",
  initialState: { data: null, saving: false, error: null },
  reducers: {
    setPassengerData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePassenger.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(savePassenger.fulfilled, (state, action) => {
        state.saving = false;
        state.data = { ...(state.data || {}), ...(action.meta?.arg || {}) };
      })
      .addCase(savePassenger.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload?.message || "Failed to save passenger";
      });
  },
});

export const { setPassengerData } = passengerSlice.actions;
export default passengerSlice.reducer;
