import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App.js";

Enzyme.configure({ adapter: new Adapter() });

describe("App component", () => {
  it("should render the component", () => {
    const component = shallow(<App />);
  });
});
