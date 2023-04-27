import styled from "styled-components";
import { useState } from "react";
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import useStorage from "../../../hooks/useStorage";
import { SelectArea, DateSelect } from "../../../components/Form";
import { AddServiceModal } from "../../../components/ConfigServiceComponents/AddServiceModal";
import { Confirmation } from "../../../components/Confirmation";
import { deleteService, scheduleUnavailableDate } from "../../../services/api";
import { UpdateServiceModal } from "../../../components/ConfigServiceComponents/UpdateServiceModal";
import { useForm } from "../../../hooks/useForm";
import WalletComponent from "../../../components/WalletConponents/WalletComponent";
 
const ConfigPage = ({view, setView}) => {
  const navigate = useNavigate();

  const [ value, setValue ] = useStorage('userInfo', {});
  const [ addServModalView, setAddServModalView ] = useState(false);
  const [ updateServModalView, setUpdateServModalView ] = useState(false);
  const [ deleteServModalView, setDeleteServModalView ] = useState(false);
  const [ unavailableConfirmationView, setUnavailableConfirmationView ] = useState(false);
  const [ selectedService, setSelectedService ] = useState(0);
  const [ form, handleForm, resetForm ] = useForm({date:dayjs()});

  async function deleteServiceById() {
    try {
      await deleteService(value.token, Number(selectedService));
      alert("Deletado com sucesso!");
      setDeleteServModalView(false);
    } catch (error) {
      if(error.reponse.status === 401) {
        alert("Usuario sem autorização!");
        setValue({});
        navigate("/");
      }
      alert("Ouve um erro!");
    }
  }

  function handleConfigService(config="delete") {
    if(!selectedService || Number(selectedService) === 0) {
      alert("Por favor selecione um serviço!");
    } else if(config === "delete"){
      setDeleteServModalView(true);
    }else if(config === "update"){
      setUpdateServModalView(true);
    }
  }

  async function addUnalaibleDate() {

    if(!form.date) alert("Por favor escolha uma data válida!")

    try {
      await scheduleUnavailableDate(value.token, dayjs(form.date).format('YYYY-MM-DD'));
      alert("Indisponibilidade agendada!");
      resetForm();
      setUnavailableConfirmationView(false);
    } catch (error) {
      if(error.reponse.status === 401) {
        alert("Usuario sem autorização!");
        setValue({});
        navigate("/");
      }
      alert("Ouve um erro!");
    }
  }

  return (
    view ?
      <Container>
        <Background onClick={() => setView(false)}/>
        <ModalArea>
          {addServModalView ? <AddServiceModal setModalView={setAddServModalView} /> : <></>}
          {updateServModalView ? <UpdateServiceModal setModalView={setUpdateServModalView} serviceId={selectedService} /> : <></>}
          {deleteServModalView ? <Confirmation setConfirmationView={setDeleteServModalView} confirmationFunction={deleteServiceById}>Deseja deletar esse serviço?</Confirmation> : <></>}
          {unavailableConfirmationView ? <Confirmation setConfirmationView={setUnavailableConfirmationView} confirmationFunction={addUnalaibleDate}>Deseja adicionar indisponibilidade para essa data: {dayjs(form.date).format('DD/MM/YYYY')}</Confirmation> : <></>}
          
          <Title>Olá, {value.user.name}</Title>
          <ConfigServicesArea>
            <Label>Editar Serviços</Label>
            <span>
              <SelectArea label="Serviços" onChange={e => setSelectedService(e.target.value)} value={selectedService} />
              <IconContext.Provider value={{className:'icons'}}>

                <ButtonsArea>
                  <Button onClick={() => setAddServModalView(true)} >+</Button>
                  <Button onClick={() => handleConfigService("delete")} >-</Button>
                  <Button onClick={() => handleConfigService("update")} >
                    <AiFillEdit />
                  </Button>
                </ButtonsArea>
            
              </IconContext.Provider>
            </span>
          </ConfigServicesArea>
          <UnavailabilityArea>
            <Label>Adicionar indisponibilidade</Label>
            <DateSelect name="date" label="Adicionar indisponibilidade" handleForm={handleForm} value={form.date} />
            <UnavailableButton onClick={() => setUnavailableConfirmationView(true)} >Adicionar indisponibilidade</UnavailableButton>
          </UnavailabilityArea>
          <WalletComponent />
        </ModalArea>
      </Container>
    : <></>
  )
}

export default ConfigPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;

  background-color: #fff;
  opacity: 0.5;
`;

const ModalArea = styled.div`
  z-index: 1;
  background-color: #FF5CA1;
  width: 650px;
  height: 90%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 100px;

  p{
    color: #fff;
  }

  @media (max-width: 800px){
    width: 85%;
    font-size: 16px;
    height: 90%;
    padding: 10px 30px;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
`;

const Label = styled.div`
  color: #fff;
  font-size: 12px;
  padding-left: 5px;
`;

const ConfigServicesArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .icons {
		color: #FF5CA1;
		font-size: 17px;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
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

const UnavailabilityArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 20px;
`;

const UnavailableButton = styled.button`
  width: 100%;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  border: 1px solid #FF5CA1;
  font-size: 16px;
  background: #FFA3CF;

  :hover{
    cursor: pointer;
  }

`;

const ButtonsArea = styled.div`
  display: flex;
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  background-color: #FFA3CF;
  margin-left: 20px;
`;
