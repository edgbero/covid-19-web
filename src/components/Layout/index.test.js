import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Container } from "react-bootstrap";

import Layout from "../Layout";

Enzyme.configure({ adapter: new Adapter() });

describe("Layout component", () => {
  it("should have Container", () => {
    const wrapper = shallow(<Layout />);
  });
});
