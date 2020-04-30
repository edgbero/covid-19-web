// @flow
import { action, thunk } from "easy-peasy";
import type { CovidType } from "./types";

const LatestCovid: CovidType = {
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
    state.initialState.result = payload;
    state.initialState.loading = false;
    state.initialState.error = false;
  }),

  error: action((state, error) => {
    state.initialState.loading = false;
    state.initialState.error = true;
    state.initialState.errorMessage = error;
  }),

  getLatestCovid: thunk(async (actions, payload) => {
    try {
      actions.beginfetch()
      const request = await fetch(
        `https://coronavirus-tracker-api.herokuapp.com/v2/latest?source=${payload}`
      );
      const response = await request.json();
      actions.fetchAction(response);
    } catch (error) {
      actions.error(error);
    }
  }),
};

export default LatestCovid;
