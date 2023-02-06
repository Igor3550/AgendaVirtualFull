import styled from "styled-components";

export const Confirmation = ({ setConfirmationView, confirmationFunction, children }) => {
  return (
    <Container>
      <Background onClick={() => setConfirmationView(false)} />
      <ModalArea>
        {children}
        <ButtonArea>
          <Button onClick={confirmationFunction} >Sim</Button>
          <Button type="cancel" onClick={() => setConfirmationView(false)}>Não</Button>
        </ButtonArea>
      </ModalArea>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalArea = styled.div`
  z-index: 1;
  background-color: #FF5CA1;
  width: 350px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: #fff;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 0;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 30%;
  height: 45px;
  color: #fff;
  background-color: #FFA3CF;
  font-size: 20px;
  text-align: center;
  border: 0;
  border-radius: 10px;
  margin: 10px;
  :hover{
    cursor: pointer;
  }
  ${props => props.type === "cancel" ?
    `
    background-color: #FF5CA1;
    color: #fff;
    border: 1px solid #fff;
    `
  : ''
  }
`;