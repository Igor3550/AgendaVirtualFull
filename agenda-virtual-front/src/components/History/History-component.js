import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetServices } from "../../hooks/Api/useServices";

export const HistoryComponent = ({ schedule }) => {
  const [scheduleService, setScheduleService] = useState({})

  const { data } = useGetServices();

  useEffect(() => {
    if(data){
      data.forEach(service => {
        if(Number(service.id) === Number(schedule.service_id)) return setScheduleService(service)
      });
    }
  }, [data]);

  return (
    <Container>
      <p><strong>Cliente:</strong> {schedule.clientName}</p>
      <p><strong>Horário:</strong> {schedule.hour}h</p>
      <p><strong>Serviço:</strong> {scheduleService ? scheduleService.name : ''}</p>
      <p><strong>Data:</strong> {dayjs(schedule.date).format('DD/MM/YYYY')}</p>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  border-radius: 10px;
  color: #FF5CA1;
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  p{
    margin: 4px 0;
  }
`;