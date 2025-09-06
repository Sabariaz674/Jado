// redux/slices/seatsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const seatsSlice = createSlice({
  name: "seats",
  initialState: { classType: "economy", selectedSeat: null, gender: "male" },
  reducers: {
    setSeatSelection: (state, action) => {
      const { classType, selectedSeat, gender } = action.payload;
      if (classType) state.classType = classType;
      if (gender) state.gender = gender;
      state.selectedSeat = selectedSeat ?? state.selectedSeat;
    },
    clearSeatSelection: (state) => {
      state.selectedSeat = null;
      state.classType = "economy";
      state.gender = "male";
    },
  },
});

export const { setSeatSelection, clearSeatSelection } = seatsSlice.actions;
export default seatsSlice.reducer;
