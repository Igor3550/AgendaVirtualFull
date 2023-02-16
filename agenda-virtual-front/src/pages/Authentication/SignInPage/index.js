import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function SingInPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        SignIn
        <button onClick={() => navigate('/dashboard/schedules')} >Dash</button>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 90%;
  height: 60%;
  max-width: 800px;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FF5CA1;
  border-radius: 10px;
  margin: 10px;
`;