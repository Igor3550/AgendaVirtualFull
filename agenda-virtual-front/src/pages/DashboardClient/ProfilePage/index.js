import styled from "styled-components";

import { useForm } from "../../../hooks/useForm";
import { InputArea } from "../../../components/Form";

const ProfilePage = () => {
  const [form, handleForm] = useForm();

  return (
    <Container>
      <h1>Olá, Cliente</h1>
      <Label>Editar perfil</Label>
      <FormContainer>
        <InputArea placeholder='Cliente' name='name' value={form.name} onChange={handleForm} />
        <InputArea placeholder='cliente@gmail.com' name='email' type='email' value={form.email} onChange={handleForm} />
        <InputArea placeholder='Senha atual' name='actualPassword' type='password' value={form.password} onChange={handleForm} />
        <InputArea placeholder='Nova senha' name='newPassword' type='password' value={form.password} onChange={handleForm} />

        <SubmitButton>
          <>Salvar alterações</>
        </SubmitButton>
      </FormContainer>
    </Container>
  );

}

export default ProfilePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    color: #fff;
    font-size: 20px;
  }
`;

const FormContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  span{
    width: 80%;
  }

  @media (max-width: 800px){
    span{
      width: 100%;
    }

  }
`;

const Label = styled.div`
  width: 100%;
  height: 30px;
  color: #fff;
  background-color: #FFA3CF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin: 10px 0;
  margin-top: 20px;
  padding: 5px 0;
`;

const SubmitButton = styled.button`
  width: 40%;
  height: 40px;
  border-radius: 10px;
  background-color: #FFA3CF;
  border: 0;
  
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  
  display: flex;
  align-items: center;
  justify-content: center;

  :hover{
    cursor: pointer;
  }

  p{
    font-size: 28px;
    padding: 0 10px;
  }

  @media (max-width: 800px){
    width: 80%;
  }
`;