import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Navbar } from "react-bootstrap";

import Navigation from "../Navigation";

Enzyme.configure({ adapter: new Adapter() });

describe("Navigation component", () => {
  it("should have Navbar", () => {
    const wrapper = shallow(<Navigation />);
    const nav = wrapper.find(Navbar)
    const brand = wrapper.find(Navbar.Brand)
    expect(nav).toHaveLength(1)
    expect(brand.text()).toEqual(" Track Covid-19")
  });

});
