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

  beginfetch: action((state, payload) => {
    state.initialState.loading = true;
    state.initialState.error = false;
  }),

  fetchAction: action((state, payload) => {
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
      actions.beginfetch();
      const request = await fetch(
        `https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=${payload}`
      );
      const response = await request.json();
      actions.fetchAction(response);
    } catch (error) {
      actions.error(error);
    }
  }),
};

export default Location;
