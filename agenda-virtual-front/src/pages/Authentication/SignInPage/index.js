import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { InputArea } from "../../../components/Form";
import { useForm } from "../../../hooks/useForm";
import { signIn, verify } from "../../../services/api";
import useStorage from "../../../hooks/useStorage";

export function SingInPage() {
  const navigate = useNavigate();

  const [ form, handleForm, resetForm ] = useForm();
  const [ value, setValue ] = useStorage('userInfo', {});

  async function submit(event) {
    event.preventDefault();

    const body = {
      email: form.email,
      password: form.password
    };

    try {
      const response = await signIn(body);
      setValue(response.data);
      verifyToken(response.data);
    } catch (error) {
      alert('Ouve um erro ao tentar fazer login!');
    }
  }

  async function verifyToken(user) {

    try {
      await verify(user.token);
      navigate('/dashboard');
    } catch (error) {
      navigate('/dashboardclient');
    }
  }

  return (
    <>
      <Container>
        <h1>Faça Login</h1>
        <form onSubmit={submit}>
          <InputArea 
            placeholder="E-mail" 
            name="email"
            type="email"
            value={form.email}
            onChange={handleForm}
            required
          />
          <InputArea 
            placeholder="Senha" 
            name="password"
            type="password"
            value={form.password}
            onChange={handleForm}
            required
          />
          <SubmitButton>Entrar</SubmitButton>
        </form>
        <h3>Não tem uma conta?</h3>
        <GoSignUpButton onClick={() => navigate('/signup')}>Cadastre-se</GoSignUpButton>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 90%;
  min-height: 330px;
  max-width: 800px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FF5CA1;
  border-radius: 10px;
  margin: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 25px;
    font-weight: 700;
    color: #fff;
    margin: 20px;
  }

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    margin: 15px;
  }

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
  }

  @media(max-width: 800px) {
    h1{
      margin: 10px;
    }
    h3{
      margin: 10px;
    }
  }
`;

const SubmitButton = styled.button`
  width: 50%;
  height: 60px;
  border: 0;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  background-color: #FFA3CF;

  @media(max-width: 800px) {
    height: 40px;
  }
`;

const GoSignUpButton = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px 15px;
  :hover {
    cursor: pointer;
  }
`;