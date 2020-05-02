import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Jumbo from "../Jumbotron";

Enzyme.configure({ adapter: new Adapter() });

describe("Jumbo component", () => {
  it("should have Container", () => {
    const wrapper = shallow(<Jumbo />);
  });
});
