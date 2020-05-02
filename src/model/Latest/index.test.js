import { createStore } from "easy-peasy";
import LatestCovid from "../Latest";

describe("Business Catalog Model", () => {
  let store = null;

  const init = () => {
    store = createStore(LatestCovid);
  };

  beforeEach(init);

  test("initial states values", () => {
    const { initialState } = store.getState();

    expect(initialState.loading).toBe(true);
    expect(initialState.error).toBe(false);
    expect(initialState.errorMessage).toBe(null);
    expect(initialState.result).toBe(null);
  });

  test("beginFetch", () => {
    store.getActions().beginFetch();
    expect(store.getState().initialState.loading).toBe(true);
    expect(store.getState().initialState.error).toBe(false);
    expect(store.getState().initialState.errorMessage).toBe(null);
  });

  test("fetchAction", () => {
    const mockPayload = {
      result: [{}],
    };
    store.getActions().fetchAction(mockPayload);
    expect(store.getState().initialState.result).toStrictEqual(mockPayload);
    expect(store.getState().initialState.error).toBe(false);
    expect(store.getState().initialState.errorMessage).toBe(null);
  });

  test("error", () => {
    store.getActions().error();
    expect(store.getState().initialState.loading).toBe(false);
    expect(store.getState().initialState.error).toBe(true);
  });

  test("fetch latest covid", async () => {
    const mockApiClient = () => ({
      get() {
        return new Promise((resolve) => resolve({ data: { result: [] } }));
      },
    });

    const getLatestCovidStore = createStore(LatestCovid, {
      injections: { apiClient: mockApiClient },
      mockActions: true,
    });
    await getLatestCovidStore.getActions().getLatestCovid();
    const expectedActions = [
      {
        type: "@thunk.getLatestCovid(start)",
        payload: undefined,
      },
      { type: "@action.beginFetch", payload: undefined },
      { type: "@action.error", payload: 'Network request failed' },
      { type: "@thunk.getLatestCovid(success)", payload: undefined, result: undefined },
      {
        type: "@thunk.getLatestCovid",
        payload: undefined,
        result: undefined,
      },
    ];
    expect(getLatestCovidStore.getMockedActions()).toEqual(expectedActions);
  });
});
