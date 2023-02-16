import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/HeaderComponent";

export function AuthenticationPage() {
  return (
    <Container>
      <Content>
        <Header>AndNails</Header>
        <Outlet />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #C52C6C;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;