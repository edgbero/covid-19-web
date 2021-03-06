// @flow
import { action, thunk } from "easy-peasy";
import type { LocationType } from "./types";

const Location: LocationType = {
  initialState: {
    loading: true,
    error: false,
    errorMessage: null,
    result: null,
  },

  beginFetch: action((state, payload) => {
    state.initialState.loading = true;
    state.initialState.error = false;
    state.initialState.errorMessage = null; 
  }),

  fetchAction: action((state, payload) => {
    if(payload.locations)
    state.initialState.result = payload.locations;
    state.initialState.loading = false;
    state.initialState.error = false;
  }),

  error: action((state, error) => {
    state.initialState.loading = false;
    state.initialState.error = true;
    state.initialState.errorMessage = error;
  }),

  getLocations: thunk(async (actions, payload) => {
    try {
      actions.beginFetch();
      const request = await fetch(
        `https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=${payload}`
      );
      const response = await request.json();
      actions.fetchAction(response);
    } catch (error) {
      actions.error(error.message)
    }
  }),
};

export default Location;
