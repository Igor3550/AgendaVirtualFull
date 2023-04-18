import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ScheduleComponent } from "./ScheduleComponent";

export const ScheduleListComponent = ({ schedules, refetch }) => {

  const [ orderedSchedules, setOrederedSchedules ] = useState({});

  useEffect(() => {
    orderSchedulesList();
  }, [schedules])

  function orderSchedulesList() {
    let today = dayjs().format('YYYY-MM-DD');

    const todaySchedules = [];
    const normalSchedules = [];
    const afterSchedules = [];

    schedules.forEach(schedule => {
      if(dayjs(schedule.date).isSame(today)) return todaySchedules.push(schedule);
      if(dayjs(schedule.date).isBefore(today)) return afterSchedules.push(schedule);
      return normalSchedules.push(schedule);
    });

    return setOrederedSchedules({ todaySchedules, normalSchedules, afterSchedules });
  }

  return (
    <Container>
      <TodaySchedulesArea>
        <Label>Agendamento para hoje</Label>

        {orderedSchedules.todaySchedules ?
          orderedSchedules.todaySchedules.map(schedule => <ScheduleComponent schedule={schedule} refetch={refetch} />)
        :<></>
        }

      </TodaySchedulesArea>
      <SchedulesArea>
        <Label>Próximo Agendamento</Label>

        {orderedSchedules.normalSchedules ?
          orderedSchedules.normalSchedules.map(schedule => <ScheduleComponent schedule={schedule} refetch={refetch} />)
        :<></>
        }
        
      </SchedulesArea>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const TodaySchedulesArea = styled.span`

`;

const Label = styled.div`
  width: 100%;
  height: 35px;
  color: #fff;
  background-color: #FFA3CF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin: 10px 0;
`;

const SchedulesArea = styled.span`

`;
