import { useQuery } from "react-query";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

import { useForm } from "../../../../hooks/useForm";
import { DateSelect, InputArea, SelectArea } from "../../../../components/Form";
import { WaitingComponent } from "../../../../components/Waiting/Waiting-component";
import { createWaiting, getWaiting } from "../../../../services/api";
import dayjs from "dayjs";

const WaitingPage = () => {
  const [form, handleForm, resetForm] = useForm();
  const [addingLoading, setAddingLoading] = useState(false);
  const { data, isLoading, refetch } = useQuery('get-waiting-list', getWaiting);

  async function handleAddToWaiting() {
    if(!form.name) return alert('Preencha corretamente!');
    setAddingLoading(true);

    const body = {
      name:form.name,
      date: dayjs(form.date).format('YYYY-MM-DD'),
      service_id: form.service
    }

    try {
      await createWaiting(body);
      resetForm({
        name: '',
        date: dayjs(),
        service: '0'
      })
      refetch();
    } catch (error) {
      console.log(error);
      alert("Ouve um erro ao adicionar à lista de espera!");
    }

    setAddingLoading(false);
  }

  return (
    <Container>
      <FormContainer>
        <InputArea placeholder='Cliente' name='name' value={form.name} onChange={handleForm} />
        <SelectArea name='service' onChange={handleForm} value={form.service} />
        <span>
          <DateSelect
            label='Escolha o dia'
            value={form.date}
            handleForm={handleForm}
            name='date'
          />
        </span>
        <SubmitButton onClick={!addingLoading ? handleAddToWaiting : () => {}}>
          {addingLoading ?
            <Oval
              height={20}
              width={20}
              color="#fff"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#FFA3CF"
            />
          :
          <><p>+</p>Adicionar a lista</>
          }
        </SubmitButton>
      </FormContainer>
      <Label>Lista de espera</Label>
      {isLoading ?
        <Oval
          height={20}
          width={20}
          color="#fff"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#FFA3CF"
        /> 
      : 
        data ?
          data.map(client => <WaitingComponent client={client} refetch={refetch} />)
        : <></>
      }
    </Container>
  );

}

export default WaitingPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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