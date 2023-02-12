import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { InputArea, SelectArea, DateSelect, HoursSelect } from "../../../components/Form";
import { createSchedule, getDayHours } from "../../../services/api";
import { useForm } from "../../../hooks/useForm";
import { Oval } from "react-loader-spinner";
import { useWainting } from "../../../contexts/WaitingContext";

const ToSchedulePage = () => {
  const waiting = useWainting();
  const [ dateHours, setDateHours ] = useState();
  const [ postScheduleLoading, setPostScheduleLoading ] = useState(false);
  const [form, handleForm, resetForm] = useForm({date:dayjs()});

  const { isFetching, refetch, error } = useQuery('get-day-hours', 
    async () => await getDayHours(dayjs(waiting.value.date ? waiting.value.date : form.date).format('YYYY-MM-DD')), 
    {
      onSuccess: (data) => {setDateHours(data)},
      onError: () => setDateHours()
    });

  useEffect(() => {
    handleForm({target:{
      name:'hour',
      value:''
    }});
    
    if(waiting.value){
      resetForm(waiting.value)
      waiting.dispatch({});
    }

    refetch();
  }, [form.date]);

  async function handleSubmit() {
    setPostScheduleLoading(true);
    if(!verifyScheduleForm()) return alert("Preencha os campos corretamente!");

    try {
      const body = {
        name: form.name,
        date: dayjs(form.date).format('YYYY-MM-DD'),
        hour: Number(form.hour),
        service_id: Number(form.service)
      }

      const response = await createSchedule(body);
      alert("Angendamento concluido!");
      resetForm({
        name: '',
        date: dayjs().format('YYYY-MM-DD'),
        hour: '',
        service: '0'
      });

    } catch (error) {
      console.log(error)
      alert("Ouve um erro ao criar agendamento! Por favor verifique os campos!");
    }
    setPostScheduleLoading(false);
  }

  function verifyScheduleForm() {
    if(!form.name) return false;
    if(!form.service || form.service === '0') return false;
    if(!form.date) return false;
    if(!form.hour) return false;
    return true;
  }

  if(error) {
    if(error.code === 'ERR_NETWORK') return (
      <ToScheduleContainer>
        <h1>Ouve um erro ao se conectar com servidor!</h1>
      </ToScheduleContainer>
    )
  };
  
  return (
    <ToScheduleContainer>
      <InputArea placeholder='Cliente' name='name' onChange={handleForm} value={form.name} />
      <SelectArea name='service' onChange={handleForm} value={form.service} />
      <div>
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
            dateHours ? 
              <HoursSelect 
                title='Selecione o horário:' 
                dayHours={dateHours} 
                selectedHour={form.hour} 
                handleForm={handleForm} 
                name='hour'
              />
            :
              <></>
        }
        <SubmitButton onClick={handleSubmit} >{postScheduleLoading ? 
            <Oval
              height={20}
              width={20}
              color="#fff"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#FFA3CF"
            />
          : 'Agendar'}
        </SubmitButton>
      </div>
    </ToScheduleContainer>
  );

}

export default ToSchedulePage;

const ToScheduleContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  >div{
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  >h1{
    color: #fff;
  }

  @media (max-width: 800px){
    >div{
      width: 100%;
      font-size: 16px;
    }
  }
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
  :hover{
    cursor: pointer;
  }
`;