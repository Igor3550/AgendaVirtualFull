import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useWainting } from "../../contexts/WaitingContext";
import { useGetServices } from "../../hooks/Api/useServices";
import { deleteWaiting } from "../../services/api";

export const WaitingComponent = ({ client, refetch }) => {
  const navigate = useNavigate();
  const {dispatch} = useWainting();
  const [serviceClient, setServiceClient] = useState();
  const {data} = useGetServices();

  async function handleAddClient() {
    try {
      await deleteWaiting(client.id);
      dispatch({value: {name:client.clientName, service: client.service_id, date: dayjs(client.date).format('YYYY-MM-DD')}});
      navigate('/toSchedule');
    } catch (error) {
      console.log(error);
      alert('Error ao alterar cliente!')
    }
  }

  async function handleDeleteClient() {
    try {
      await deleteWaiting(client.id);
      refetch();
    } catch (error) {
      console.log(error);
      alert('Error ao alterar cliente!')
    }
  }

  useEffect(() => {
    data.forEach(service => {
      if(service.id === client.service_id){
        return setServiceClient(service.name);
      }
    });
  }, [data])

  return (
    <Component>
      <ClientInfo>
        <p><strong>Cliente: </strong>{client.clientName}</p>
        <p><strong>Data: </strong>{dayjs(client.date).format('DD/MM/YYYY')}</p>
        <p><strong>Serviço: </strong>{serviceClient}</p>
      </ClientInfo>
      <ButtonsArea>
        <Button onClick={handleAddClient} type="create">+</Button>
        <Button onClick={handleDeleteClient} >-</Button>
      </ButtonsArea>
    </Component>
  );
}

const Component = styled.div`
  width: 60%;
  border-radius: 10px;
  color: #FF5CA1;
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  p{
    margin: 4px 0;
  }

  @media (max-width: 800px){
    width: 80%;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  color: #FF5CA1;
  border: 1px solid #FF5CA1;
  font-size: 20px;
  margin: 10px;
  background: #fff;
  ${props => props.type === 'create' ? `
    background: #FF5CA1;
    color: #fff;
  ` 
  : ``};

  :hover{
    cursor: pointer;
  }

`;

const ButtonsArea = styled.div`
  display: flex;
  flex-direction: column;
`;
