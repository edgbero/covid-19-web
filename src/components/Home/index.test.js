import React from 'react'
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore, StoreProvider } from 'easy-peasy'
import model from '../../model';
import Home from "../Home";

Enzyme.configure({ adapter: new Adapter() });

it('should render the component', () => {
    const store = createStore(model)
    const app = shallow(
      <StoreProvider store={store}>
        <Home />
      </StoreProvider>
    )
})