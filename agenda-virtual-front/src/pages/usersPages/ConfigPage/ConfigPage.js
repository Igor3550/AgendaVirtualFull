import styled from "styled-components";
import { useState } from "react";

import useStorage from "../../../hooks/useStorage";
import { SelectArea, DateSelect } from "../../../components/Form";
import { AddServiceModal } from "../../../components/ConfigServiceComponents/AddServiceModal";
 
const ConfigPage = ({view, setView}) => {

  const [ value ] = useStorage('userInfo', {});
  const [ addServModalView, setAddServModalView ] = useState(false);

  return (
    view ?
      <Container>
        <Background onClick={() => setView(false)}/>
        <ModalArea>
          {addServModalView ? <AddServiceModal setModalView={setAddServModalView} /> : <></>}
          
          <Title>Olá, {value.user.name}</Title>
          <ConfigServicesArea>
            <SelectArea label="Serviços" />
            <ButtonsArea>
              <Button type="create" onClick={() => setAddServModalView(true)} >+</Button>
              <Button>-</Button>
            </ButtonsArea>
          </ConfigServicesArea>
          <UnavailabilityArea>
            <Label>Adicionar indisponibilidade</Label>
            <DateSelect label="Adicionar indisponibilidade" />
          </UnavailabilityArea>
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
  height: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  p{
    color: #fff;
  }

  @media (max-width: 800px){
    width: 85%;
    font-size: 16px;
    height: 90%;
    padding: 20px;
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
  margin: 5px;
`;

const ConfigServicesArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  flex-direction: column;
`;

const ButtonsArea = styled.div`
  display: flex;
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  background-color: #FFA3CF;
  margin-left: 20px;
`;
