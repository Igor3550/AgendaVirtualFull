import styled from "styled-components";
import { useForm } from "../../hooks/useForm";
import { InputArea } from "../Form";
import { createService } from "../../services/api";
import useStorage from "../../hooks/useStorage";
import { useNavigate } from "react-router-dom";

export const AddServiceModal = ({ setModalView, children }) => {
  const navigate = useNavigate();

  const [form, handleForm, resetForm] = useForm();
  const [ value, setValue ] = useStorage("userInfo", {});

  async function handleCreateService(e) {
    e.preventDefault();

    const body = {
      name: form.name,
      duration: Number(form.duration),
      price: Number(form.price)
    }

    try {
      await createService(value.token, body);
      resetForm();
      setModalView(false);
      alert("Serviço criado!");
    } catch (error) {
      if(error.reponse.status === 400) alert("Por favor verifique os campos!");
      if(error.reponse.status === 401) {
        alert("Usuario sem autorização!");
        setValue({});
        navigate("/");
      }
    }
  }

  return (
    <Container>
      <Background onClick={() => setModalView(false)} />
      <ModalArea>
        <Title>Adicionar novo serviço</Title>
        <form onSubmit={handleCreateService}>
          <InputArea
            placeholder="Nome do serviço"
            name="name"
            type="name"
            value={form.name}
            onChange={handleForm}
            required
          />
          <InputArea
            placeholder="Duração em horas (somente numeros)"
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleForm}
            required
          />
          <InputArea
            placeholder="Valor (somente numeros)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleForm}
            required
          />
          <ButtonArea>
            <Button>Salvar</Button>
            <Button type="cancel" onClick={() => setModalView(false)}>Cancelar</Button>
          </ButtonArea>
        </form>
        {children}
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
  width: 80%;
  height: 50%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: #fff;

  form {
    width: 100%;
    min-height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    margin-top: 20px;
  }
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

const Title = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
`;

const ButtonArea = styled.div`
  width: 100%;
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