import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import russiaTopojson from "./map12.ethnicgroups.json";
import { RootState } from "../../store";
import { Objects, Topology } from "topojson-specification";

export interface MapState {
  loading: boolean;
  error: string | null;
  success: boolean;
  russiaTopojson: Topology<Objects<RegionProperty>>;
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
  russiaTopojson: russiaTopojson as any,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    getMap: (state: MapState): Topology<Objects<RegionProperty>> => {
      return state.russiaTopojson;
    },
  },
});

export const { getMap } = mapSlice.actions;

export default mapSlice.reducer;
