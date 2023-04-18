import styled from "styled-components";
import { useEffect, useState } from "react";

import { useForm } from "../../../../hooks/useForm";
import { InputArea } from "../../../../components/Form";
import { Confirmation } from "../../../../components/Confirmation";
import useStorage from "../../../../hooks/useStorage";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../../../services/api";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [ logoutConfirmView, setLogoutConfirmView ] = useState(false);
  const [ form, handleForm ] = useForm();
  const [ value, setValue ] = useStorage('userInfo', {});

  useEffect(() => {
    if(!value.user) navigate('/');
  }, [value]);

  function handleLogout() {
    navigate('/');
    setValue({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let altered = false;

    const body = {
      name: form.name,
      email: form.email
    }

    if(!form.name){
      body.name = value.user.name;
    }else{
      altered = true;
    }

    if(!form.email){
      body.email = value.user.email;
    }else{
      altered = true;
    }

    if(altered) {
      try {
        const res = await updateUserInfo(value.token, body);
        alert("Dados alterados!");
        const newValue = {token: value.token, user: res.data};
        setValue(newValue);
      } catch (error) {
        alert("Ouve um erro ao alterar seus dados!");
      }
    }
  }

  return (
    <Container>
      <h1>Olá, {value.user ? value.user.name : ''}</h1>
      <Label>Editar perfil</Label>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputArea
            placeholder={value.user ? value.user.name : ''}
            name='name'
            value={form.name}
            onChange={handleForm}
          />
          <InputArea placeholder={value.user ? value.user.email : ''} name='email' type='email' value={form.email} onChange={handleForm} />
          <InputArea placeholder='Senha atual' name='actualPassword' type='password' value={form.password} onChange={handleForm} />
          <InputArea placeholder='Nova senha' name='newPassword' type='password' value={form.newPassword} onChange={handleForm} />

          <SubmitButton>
            Salvar alterações
          </SubmitButton>
        </form>

        <ExitButton onClick={() => setLogoutConfirmView(true)} >
          Sair
        </ExitButton>
        {logoutConfirmView ?
          <Confirmation setConfirmationView={setLogoutConfirmView} confirmationFunction={handleLogout}>Deseja sair da agenda?</Confirmation>
          :
          <></>
        }
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

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
  }

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
  margin-top: 10px;

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

const ExitButton = styled.button`
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
  margin-top: 30px;

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