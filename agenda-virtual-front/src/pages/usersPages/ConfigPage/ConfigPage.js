import { useEffect } from "react";
import styled from "styled-components";

const ConfigPage = ({view, setView}) => {
  return (
    view ?
      <Container>
        <Background onClick={() => setView(false)}/>
        <ModalArea>
          <Label>Olá, </Label>
        </ModalArea>
      </Container>
    : <></>
  )
}

export default ConfigPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;

  background-color: #fff;
  opacity: 0.5;
`;

const ModalArea = styled.div`
  z-index: 1;
  background-color: #FF5CA1;
  width: 650px;
  height: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  p{
    color: #fff;
  }

  @media (max-width: 800px){
    width: 85%;
    font-size: 16px;
    height: auto;
    padding: 20px;
  }
`;

const Label = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
`;
