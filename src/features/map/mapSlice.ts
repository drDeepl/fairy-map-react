import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as turf from "@turf/turf";
import { feature } from "topojson-client";
import { FeatureCollection } from "geojson";
import { MapControllerService } from "../../api/services/MapControllerService";

export interface MapState {
  loading: boolean;
  error: string | null;
  success: boolean;
  dataMap: FeatureCollection | null;
}

const initialState: MapState = {
  loading: false,
  error: null,
  success: false,
  dataMap: null,
};

export const fetchMapData = createAsyncThunk("map/fetchMapData", async () => {
  const response = await MapControllerService.mapControllerGetMapTopojson();
  console.log(response);
  return response;
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
        const geoJson = feature(action.payload, action.payload.objects.map);

        const simplifyOptions = { tolerance: 0.008, highQuality: false };

        const simplifyFeatures = turf.simplify(geoJson, simplifyOptions);
        state.dataMap = simplifyFeatures.features as FeatureCollection;
        state.loading = false;
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default mapSlice.reducer;
