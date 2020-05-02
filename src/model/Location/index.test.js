import { createStore } from "easy-peasy";
import Location from "../Location";

describe("Business Catalog Model", () => {
  let store = null;

  const init = () => {
    store = createStore(Location);
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
        locations: {}
    };
    store.getActions().fetchAction(mockPayload);
    expect(store.getState().initialState.result).toStrictEqual(mockPayload.locations);
    expect(store.getState().initialState.error).toBe(false);
    expect(store.getState().initialState.errorMessage).toBe(null);
  });

  test("error", () => {
    store.getActions().error();
    expect(store.getState().initialState.loading).toBe(false);
    expect(store.getState().initialState.error).toBe(true);
  });

  test("fetch countries", async () => {
    const mockApiClient = () => ({
      get() {
        return new Promise((resolve) => resolve({ data: { result: [] } }));
      },
    });

    const getLocationStore = createStore(Location, {
      injections: { apiClient: mockApiClient },
      mockActions: true,
    });
    await getLocationStore.getActions().getLocations();
    const expectedActions = [
      {
        type: "@thunk.getLocations(start)",
        payload: undefined,
      },
      { type: "@action.beginFetch", payload: undefined },
      { type: "@action.error", payload: 'Network request failed' },
      { type: "@thunk.getLocations(success)", payload: undefined, result: undefined },
      {
        type: "@thunk.getLocations",
        payload: undefined,
        result: undefined,
      },
    ];
    expect(getLocationStore.getMockedActions()).toEqual(expectedActions);
  });
});
