import { createStore } from "easy-peasy";
import Source from "../Source";

describe("Business Catalog Model", () => {
  let store = null;

  const init = () => {
    store = createStore(Source);
  };

  beforeEach(init);


  test("initial states values", () => {
    const { initialState } = store.getState();
    expect(initialState.loading).toBe(true);
    expect(initialState.error).toBe(false);
    expect(initialState.errorMessage).toBe(null);
    expect(initialState.result).toBe(null);
  });

  test("fetchAction", () => {
    const mockPayload = {
        sources: ['jhu', 'csbs', 'nyt']
    }
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

  test("fetch countries", async () => {
    const mockPayload = {
        sources: ['jhu', 'csbs', 'nyt']
    }

    const mockApiClient = () => ({
      get() {
        return new Promise((resolve) => resolve({ data: { result: [] } }));
      },
    });

    const getSourceStore = createStore(Source, {
      injections: { apiClient: mockApiClient },
      mockActions: true,
    });
    await getSourceStore.getActions().getSource();
    const expectedActions = [
      {
        type: "@thunk.getSource(start)",
        payload: undefined,
      },
      { type: "@action.fetchAction", payload: mockPayload },
      { type: "@thunk.getSource(success)", payload: undefined, result: undefined },
      {
        type: "@thunk.getSource",
        payload: undefined,
        result: undefined,
      },
    ];
    expect(getSourceStore.getMockedActions()).toEqual(expectedActions);
  });
});
