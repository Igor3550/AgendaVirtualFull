import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { useForm } from "../../hooks/useForm";
import { InputArea } from "../Form";
import { updateService, getServiceById } from "../../services/api";
import useStorage from "../../hooks/useStorage";

export const UpdateServiceModal = ({ setModalView, children, serviceId }) => {
  const navigate = useNavigate();

  const [form, handleForm, resetForm] = useForm();
  const [ value, setValue ] = useStorage("userInfo", {});
  const { data, isFetching, refetch, error } = useQuery('get-service', handleGetService, {onSuccess: ((data) => console.log(data))});

  async function handleGetService() {
    try {
      return await getServiceById(value.token, serviceId);
    } catch (error) {
      if(error.reponse.status === 400) alert("Por favor verifique os campos!");
      if(error.reponse.status === 401) {
        alert("Usuario sem autorização!");
        setValue({});
        navigate("/");
      }
      alert("Ouve um erro!");
    }
  }

  async function handleUpdateService(e) {
    e.preventDefault();

    let altered = false;

    const body = {
      name: form.name,
      duration: Number(form.duration),
      price: Number(form.price)
    }

    if(!form.name){
      body.name = data.data.name;
    }else{
      altered = true;
    }

    if(!form.duration){
      body.duration = data.data.duration;
    }else{
      altered = true;
    }

    if(!form.price){
      body.price = data.data.price;
    }else{
      altered = true;
    }

    if(altered) {
      try {
        await updateService(value.token, body, Number(serviceId));
        resetForm();
        setModalView(false);
        alert("Serviço Alterado!");
      } catch (error) {
        if(error.reponse.status === 400) alert("Por favor verifique os campos!");
        if(error.reponse.status === 401) {
          alert("Usuario sem autorização!");
          setValue({});
          navigate("/");
        }
        alert("Ouve um erro!");
      }
    }

    
  }

  return (
    <Container>
      <Background onClick={() => setModalView(false)} />
      {isFetching ? <>...</> :
      
      <ModalArea>
        <Title>Alterar serviço</Title>
        <form onSubmit={handleUpdateService}>
          <InputArea
            placeholder={data.data.name}
            name="name"
            type="name"
            value={form.name}
            onChange={handleForm}
          />
          <InputArea
            placeholder={`Duration: ${data.data.duration}h`}
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleForm}
          />
          <InputArea
            placeholder={`Valor: R$${data.data.price},00`}
            name="price"
            type="number"
            value={form.price}
            onChange={handleForm}
          />
          <ButtonArea>
            <Button>Salvar</Button>
            <Button type="cancel" onClick={() => setModalView(false)}>Cancelar</Button>
          </ButtonArea>
        </form>
        {children}
      </ModalArea>
      }
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