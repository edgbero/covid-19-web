import * as React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import styled from "styled-components";
import wordImage from "../../assets/home/pic.jpg";

const StyledJumbotron = styled(Jumbotron)`
  margin: 20px 0px;
  background: url(${wordImage});
  background-size: cover;
  color: #ccc;
  position: relative;
  z-index: -2;
  height: 230px;

  @media (max-width: 480px) {
    height: 160px;
  }
`;

const StyledOverlay = styled.div`
  background-color: #000;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const StyledParagraph = styled.p`
  margin-top: 20px;
  text-align: justify;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Jumbo = (): React => {
  return (
    <StyledJumbotron fluid>
      <StyledOverlay />
      <Container>
        <Title>CORONA SAAT INI</Title>
        <StyledParagraph>
          Sejak ditetapkan sebagai pandemi oleh World Health Organization (WHO)
          Rabu 11 Maret 2020, penyebaran virus Corona di dunia semakin meluas.
          Fakta bahwa penyebaran dan penularan virus Corona yang terjadi sangat
          cepat antar manusia bahkan membuat virus ini sulit dikendalikan.
        </StyledParagraph>
      </Container>
    </StyledJumbotron>
  );
};

export default Jumbo;
