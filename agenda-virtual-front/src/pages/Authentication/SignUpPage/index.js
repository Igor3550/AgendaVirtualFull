import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { InputArea } from "../../../components/Form";
import { useForm } from "../../../hooks/useForm";
import { signUp } from "../../../services/api";

export function SingUpPage() {
  const navigate = useNavigate();

  const [ form, handleForm, resetForm ] = useForm();

  async function submit(event) {
    event.preventDefault();

    const body = form;

    try {
      console.log(body);
      await signUp(body);
      alert("Cadastro concluido! Por favor faça login!");
      navigate('/');
    } catch (error) {
      if(error.response.status === 409){
        alert('O email já foi cadastrado! Se estiver com problemas para acessar sua conta por favor entre em contato!');
        return
      }
      alert('Ouve um erro ao tentar fazer login!');
    }
  }

  return (
    <>
      <Container>
        <h1>Cadastre-se</h1>
        <form onSubmit={submit}>
        <InputArea 
            placeholder="Nome" 
            name="name"
            type="name"
            value={form.name}
            onChange={handleForm}
            required
          />
          <InputArea 
            placeholder="E-mail" 
            name="email"
            type="email"
            value={form.email}
            onChange={handleForm}
            required
          />
          <InputArea 
            placeholder="Crie uma Senha" 
            name="password"
            type="password"
            value={form.password}
            onChange={handleForm}
            required
          />
          <InputArea 
            placeholder="Confirme sua Senha" 
            name="password"
            type="password"
            required
          />
          <SubmitButton>Cadastrar</SubmitButton>
        </form>
        <h3>Já tem uma conta?</h3>
        <GoButton onClick={() => navigate('/')}>Faça Login</GoButton>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 90%;
  min-height: 470px;
  max-width: 800px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FF5CA1;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;

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

const GoButton = styled.div`
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