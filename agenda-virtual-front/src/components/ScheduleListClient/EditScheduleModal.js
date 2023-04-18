import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { Oval } from "react-loader-spinner";

import { getDayHours, updateSchedule } from "../../services/clientsApi";
import { SelectArea, DateSelect, HoursSelect } from "../Form";
import { useForm } from "../../hooks/useForm";
import useStorage from "../../hooks/useStorage";

export const EditScheduleModal = ({ setVisible, schedule, service }) => {

  const [ form, handleForm, resetForm ] = useForm({ 
    name: schedule.clientName,
    date: schedule.date,
    hour: schedule.hour,
    service: schedule.service_id
  });
  const [ dayHours, setDayHours ] = useState();
  const [ btnScheduleLoading, setBtnScheduleLoading ] = useState(false);
  const [ value ] = useStorage('userInfo', {});

  const { isFetching, refetch } = useQuery('get-day-hours-edit', 
    async () => await getDayHours(dayjs(form.date).format('YYYY-MM-DD')), 
    {
      onSuccess: (data) => setDayHours(data),
      onError: () => setDayHours()
    });

  useEffect(() => {
    refetch();
    if(form.date !== schedule.date) {
      handleForm({target:{
        name:'hour',
        value:''
      }});
    }
  }, [form.date]);

  async function handleUpdate() {
    setBtnScheduleLoading(true);
    console.log(form);
    if(!verifyScheduleForm()) return alert("Preencha os campos corretamente!");

    try {
      const body = {
        name: form.name,
        date: dayjs(form.date).format('YYYY-MM-DD'),
        hour: Number(form.hour),
        service_id: Number(form.service)
      }

      const response = await updateSchedule(value.token, body, schedule.id);
      console.log(response.data);
      alert("Angendamento Alterado!");
      resetForm({
        name: '',
        date: dayjs().format('YYYY-MM-DD'),
        hour: '',
        service: '0'
      });
      setVisible(false);

    } catch (error) {
      console.log(error)
      alert("Ouve um erro ao alterar agendamento! Por favor verifique os campos!");
    }
    setBtnScheduleLoading(false);
  }

  function verifyScheduleForm() {
    if(!form.name) return false;
    if(!form.service || form.service === '0') return false;
    if(!form.date) return false;
    if(!form.hour) return false;
    return true;
  }

  return (
    <Container>
      <Background onClick={() => setVisible(false)} />
      <ModalArea>
        <p>Alterar agendamento</p>
        <SelectArea name='service' onChange={handleForm} value={form.service} />
        <DateHourArea>
          <DateSelect 
            label='Escolha o dia'
            value={form.date}
            handleForm={handleForm}
            name='date'
          />
          {isFetching ?
              <Oval
                height={20}
                width={20}
                color="#fff"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#FFA3CF"
              />
            :
              dayHours ?
                <HoursSelect 
                  title='Selecione o horário:' 
                  dayHours={dayHours} 
                  selectedHour={form.hour} 
                  handleForm={handleForm} 
                  name='hour'
                  value={form.hour}
                  editException={schedule.hour}
                  service={service}
                />
              : <></>
          }
        <SubmitButton onClick={btnScheduleLoading ? () => {} : handleUpdate}>
          
          {btnScheduleLoading ?
            <Oval
              height={20}
              width={20}
              color="#fff"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#FFA3CF"
            />
          : <strong>Alterar</strong>
          }
        </SubmitButton>
        </DateHourArea>
      </ModalArea>
    </Container>
  );
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
  width: 550px;
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
    height: auto;
    padding: 20px;
  }
`;

const DateHourArea = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px){
    width: 100%;
    font-size: 16px;
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

const SubmitButton = styled.button`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #FFA3CF;
  font-size: 20px;
  text-align: center;
  border: 0;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover{
    cursor: pointer;
  }
`;