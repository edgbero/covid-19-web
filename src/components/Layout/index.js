import * as React from "react";
import { Container } from "react-bootstrap";
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  padding: 0px;
`

const Layout = (props): React.Node => {
  return <StyledContainer>{props.children}</StyledContainer>;
};

export default Layout;
