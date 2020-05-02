import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Image } from "react-bootstrap";
import githubIcon from "../../assets/about/githubIcon.png";
import About from "../About";

Enzyme.configure({ adapter: new Adapter() });

describe("About component", () => {
  it("should render the component", () => {
    const wrapper = shallow(<About />);
  });

});
