// @flow
import { action, thunk } from "easy-peasy";
import type { SourceType } from "./types";

const Source: SourceType = {
  initialState: {
    loading: true,
    error: false,
    errorMessage: null,
    result: null,
  },

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

  getSource: thunk(async (actions, payload) => {
    try {
      const request = await fetch(
        "https://coronavirus-tracker-api.herokuapp.com/v2/sources"
      );
      const response = await request.json();
      actions.fetchAction(response);
    } catch (error) {
      actions.error(error.message)
    }
  }),
};

export default Source;
