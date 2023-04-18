import styled from "styled-components";
import { IconContext } from "react-icons";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { EditScheduleModal } from "./EditScheduleModal";
import { DeleteScheduleComponent } from "./DeleteScheduleComponent";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetServices } from "../../hooks/Api/useServices";

export const ScheduleComponent = ({ schedule, refetch }) => {
  const [ deleteConfirmationView, setDeleteConfirmationView ] = useState(false);
  const [ editModal, setEditModal ] = useState(false);
  const [ scheduleService, setScheduleService ] = useState({});

  const { data } = useGetServices();

  useEffect(() => {
    if(data){
      data.forEach(service => {
        if(Number(service.id) === Number(schedule.service_id)) return setScheduleService(service)
      });
    }
  }, [data]);

  return (
    <ScheduleContainer>
      {editModal ? <EditScheduleModal setVisible={setEditModal} schedule={schedule} service={scheduleService} /> : <></>}
      <IconContext.Provider value={{ className: 'icons' }} >

        <TopContext>
          <ClientInfo>
            <p><strong>Data:</strong> {dayjs(schedule.date).format('DD/MM')}</p>
            <p><strong>Horário:</strong> {schedule.hour}h</p>
            <p><strong>Serviço:</strong> {scheduleService ? scheduleService.name : ''}</p>
            <p><strong>Valor:</strong> R${scheduleService ? scheduleService.price : ''},00</p>
          </ClientInfo>
          <SideButtonsArea>
            <SideButton onClick={() => setEditModal(!editModal)} ><HiOutlinePencil /></SideButton>
            <SideButton onClick={() => setDeleteConfirmationView(true)} >
              <BsTrash />
            </SideButton>
            <DeleteScheduleComponent scheduleId={schedule.id} confirmationView={deleteConfirmationView} setConfirmationView={setDeleteConfirmationView} />
          </SideButtonsArea>
        </TopContext>
      </IconContext.Provider>
    </ScheduleContainer>
  )
}

const ScheduleContainer = styled.div`
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;

  div{
    display: flex;
  }

  .icons {
		color: #ffffff;
		font-size: 20px;
  }
`;

const TopContext = styled.div`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;
`;

const ClientInfo = styled.div`
  flex-direction: column;

  p{
    color: #FF5CA1;
    margin-bottom: 3px;
  }
`;

const SideButtonsArea = styled.div`
  flex-direction: column;
`;

const SideButton = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border: 0;
  margin: 2px;
  text-align: center;
  align-items: center;
  background-color: #FFA3CF;

  :hover{
    cursor: pointer;
  }
`;

const EndButton = styled.button`
  width: 60%;
  height: 40px;
  margin: auto;
  border-radius: 5px;
  border: 0;
  text-align: center;
  align-items: center;
  background-color: #FF5CA1;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover{
    cursor: pointer;
  }
`;