// @flow
import * as React from "react";
import styled from "styled-components";
import { Container, Image } from "react-bootstrap";
import githubIcon from "../../assets/about/githubIcon.png";

const Title = styled.h1`
  text-align: center;
  font-family: monospace;
  font-weight: 1000;
  font-size: ${(props) => props.fontSize};
  margin: 30px 0px;

  @media (max-width: 480px) {
    font-size: ${(props) => props.fontResp};
  }

  .primary {
    color: ${(props) => props.color};
  }
`;

const About = (): React.Node => {
  return (
    <React.Fragment>
      <Container className="text-center mt-3">
        <Image src={githubIcon}></Image>
      </Container>
      <Title fontSize="32px" color="#70baac">
        <a className="primary" href="https://github.com/edgbero">
          Author: Edgar Bero
        </a>
      </Title>
    </React.Fragment>
  );
};

export default About;
