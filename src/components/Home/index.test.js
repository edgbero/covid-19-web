import React from "react";
import { StoreProvider } from 'easy-peasy'
import { ThemeProvider } from 'styled-components'
import { createMemoryHistory } from 'history'
import { createStore } from 'easy-peasy'
import Enzyme, { shallow } from "enzyme";
import { Router } from 'react-router-dom'
import models from '../../model'
import Home from "../Home";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const theme = {

  }
  
function renderWithThemeProvider(Component) {
    return shallow(
      <ThemeProvider theme={theme}>{Component}</ThemeProvider>,
    )
  }

function renderWithRouterAndThemeProvider(
    Component,
    route = '/',
  ) {
    return renderWithThemeProvider(
      <Router history={createMemoryHistory(route)}>{Component}</Router>,
    )
  }

const renderWithRedux = (ui, { store } = {}) => {
    return {
      ...renderWithRouterAndThemeProvider(
        <StoreProvider store={store}>{ui}</StoreProvider>,
      ),
      store,
    }
  }



describe('<Home />', () => {
  test('should be render component <Home /> with redux with defaults', () => {
    renderWithRedux(<Home />, {
      store: createStore({ ...models }),
    })
  })
})

  