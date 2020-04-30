// @flow
import { Action, Thunk, Model } from 'easy-peasy'

export type ActionType = Action<Model, any>

export type ThunkType = Thunk<Model, any, any>

export type StateType = {
  result: any | null,
  loading: boolean,
  error: boolean,
  errorMessage: null,
}

export type SourceType = {
  initialState: StateType,
  fetchAction: ActionType,
  error: ActionType,
  getSource: ThunkType,
}
