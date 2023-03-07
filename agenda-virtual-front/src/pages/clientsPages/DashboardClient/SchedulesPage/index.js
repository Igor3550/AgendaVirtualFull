import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import styled from "styled-components";

import { ScheduleListComponent } from "../../../../components/ScheduleList/ScheduleListComponent";
import { getScheduleList } from "../../../../services/api";

const SchedulesPage = () => {
  const { data, isLoading, error, refetch } = useQuery('get-schedules', getScheduleList);

  if(error) return (
    <SchedulesContainer>
      <h1>Ouve um erro ao se conectar com servidor!</h1>
    </SchedulesContainer>
  );

  return (
    <SchedulesContainer>
      {isLoading ?
        <Oval
          height={30}
          width={30}
          color="#fff"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#FFA3CF"
        />
      :
        data ? <ScheduleListComponent schedules={data} refetch={refetch} /> : <></>
      }
    </SchedulesContainer>
  );

}

export default SchedulesPage;

const SchedulesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  >h1{
    color: #fff;
  }
`;