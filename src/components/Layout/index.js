// @flow
import * as React from "react";
import { Container } from "react-bootstrap";

const Layout = (props: any) => {
  return <Container>{props.children}</Container>;
};

export default Layout;
