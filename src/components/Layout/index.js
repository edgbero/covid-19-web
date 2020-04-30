import * as React from "react";
import { Container } from "react-bootstrap";

const Layout = (props): React.Node => {
  return <Container>{props.children}</Container>;
};

export default Layout;
