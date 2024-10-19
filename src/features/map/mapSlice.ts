import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import russiaTopojson from "./map12.json";

import { Objects, Topology } from "topojson-specification";
import axios from "axios";

export interface MapState {
  loading: boolean;
  error: string | null;
  success: boolean;
  dataMap: Topology<Objects<RegionProperty>>;
}

interface RegionProperty {
  id: string;
  name: string;
  shapeISO: string;
  shapeID: string;
  shapeGroup: string;
  shapeType: string;
}

const initialState: MapState = {
  loading: false,
  error: null,
  success: false,
  dataMap: russiaTopojson as any,
};

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export const fetchMapData = createAsyncThunk("map/fetchMapData", async () => {
  const response = await axios.get(`${API_URL}/map/map.json`);
  return response.data;
});

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMapData.fulfilled, (state, action) => {
        state.loading = false;
        state.dataMap = action.payload;
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default mapSlice.reducer;
