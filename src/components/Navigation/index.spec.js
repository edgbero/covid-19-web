import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Navbar } from "react-bootstrap";

import Navigation from "../Navigation";

Enzyme.configure({ adapter: new Adapter() });

describe("Navigation component", () => {
  it("should render component", () => {
    const wrapper = shallow(<Navigation />);
  });

});
