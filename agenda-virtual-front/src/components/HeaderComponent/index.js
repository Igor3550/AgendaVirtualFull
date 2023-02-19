import styled from "styled-components";

export function Header({ children }) {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  )
}

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin: 40px;

  @media(max-width: 800px){
    margin: 15px;
  }
`;