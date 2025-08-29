import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadReservedSeatsApi, reserveSeatApi, releaseSeatApi } from "../../api/seats";


const getCookie = (name) => {
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
};
const setCookie = (name, value, days = 180) => {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
};
const ensureGuestId = () => {
  let id = getCookie("guestId");
  if (!id) {
    id = crypto.randomUUID();
    setCookie("guestId", id);
  }
  return id;
};

const pickMongoId = (u) => {
  const id = u?._id;
  return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id) ? id : null;
};
const getIdentity = (state) => {
  const user = state.auth?.user || {};
  const mongoId = pickMongoId(user);
  const userEmail = user?.email || null;
  const guestId = ensureGuestId();
  const idForServer = mongoId || guestId;
  return { mongoId, userEmail, idForServer };
};

/* ---------------- thunks ---------------- */
export const loadReservedSeats = createAsyncThunk(
  "seats/loadReserved",
  async (flightId, { getState, rejectWithValue }) => {
    try {
      const { mongoId, userEmail, idForServer } = getIdentity(getState());
      const excludeUserId = mongoId || userEmail || idForServer;

      const { data } = await loadReservedSeatsApi(flightId, excludeUserId);

      const map = {};
      (data || []).forEach((r) => {
        map[r.seatId] = { gender: r.reservedByGender };
      });
      return map;
    } catch (e) {
      return rejectWithValue({
        message: e.response?.data?.message || e.message || "Failed to fetch reserved seats",
      });
    }
  }
);

export const reserveSeat = createAsyncThunk(
  "seats/reserveOne",
  async ({ flightId, seatId, gender, klass = "economy" }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { mongoId, userEmail, idForServer } = getIdentity(state);

      // Release previous seat for same flight if selected
      const prevSeat = state.seats.selectedSeat;
      const prevFlight = state.seats.flightId;
      if (prevSeat && prevSeat !== seatId && prevFlight === flightId) {
        try {
          await releaseSeatApi({
            flightId,
            seatId: prevSeat,
            userId: mongoId || userEmail || idForServer,
          });
        } catch {
          /* ignore best-effort release */
        }
      }

      const { data } = await reserveSeatApi({
        flightId,
        seatId,
        gender,
        klass,
        userId: idForServer,
        userEmail,
      });

      return { flightId, seatId: data?.seat?.seatId || seatId, gender };
    } catch (e) {
      if (e.response?.status === 409) {
        return rejectWithValue({
          code: 409,
          message: e.response?.data?.message || "Seat already reserved",
        });
      }
      return rejectWithValue({
        message: e.response?.data?.message || e.message || "Reserve failed",
      });
    }
  }
);

export const releaseSeat = createAsyncThunk(
  "seats/release",
  async ({ flightId, seatId }, { getState, rejectWithValue }) => {
    try {
      const { mongoId, userEmail, idForServer } = getIdentity(getState());
      await releaseSeatApi({
        flightId,
        seatId,
        userId: mongoId || userEmail || idForServer,
      });
      return { seatId };
    } catch (e) {
      return rejectWithValue({
        message: e.response?.data?.message || e.message || "Release failed",
      });
    }
  }
);

/* ---------------- slice ---------------- */
const initialState = {
  classType: "economy",
  gender: "male",
  selectedSeat: null,
  flightId: null,
  reservedMap: {},
  loading: false,
  error: null,
};

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setClassType: (s, a) => { s.classType = a.payload; },
    setGender: (s, a) => { s.gender = a.payload; },
    setFlightId: (s, a) => { s.flightId = a.payload; },
    selectSeatLocal: (s, a) => { s.selectedSeat = a.payload; },
    clearSeat: (s) => { s.selectedSeat = null; },
  },
  extraReducers: (b) => {
    b
      .addCase(loadReservedSeats.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadReservedSeats.fulfilled, (s, a) => { s.loading = false; s.reservedMap = a.payload || {}; })
      .addCase(loadReservedSeats.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message; })
      .addCase(reserveSeat.fulfilled, (s, a) => {
        const { seatId, gender, flightId } = a.payload;
        s.flightId = flightId;
        s.selectedSeat = seatId;
        s.gender = gender;
        s.error = null;
      })
      .addCase(reserveSeat.rejected, (s, a) => { s.error = a.payload?.message || "Seat already reserved"; })
      .addCase(releaseSeat.fulfilled, (s, a) => { if (s.selectedSeat === a.payload.seatId) s.selectedSeat = null; });
  },
});

export const { setClassType, setGender, selectSeatLocal, clearSeat, setFlightId } = seatSlice.actions;
export default seatSlice.reducer;
