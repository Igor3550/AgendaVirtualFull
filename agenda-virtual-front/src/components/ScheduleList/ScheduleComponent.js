import styled from "styled-components";
import { IconContext } from "react-icons";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { EditScheduleModal } from "./EditScheduleModal";
import { DeleteScheduleComponent } from "./DeleteScheduleComponent";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetServices } from "../../hooks/Api/useServices";
import { finishSchedule } from "../../services/api";
import { Oval } from "react-loader-spinner";
import { Confirmation } from "../Confirmation";
import useStorage from "../../hooks/useStorage";

export const ScheduleComponent = ({ schedule, refetch }) => {
  const [ deleteConfirmationView, setDeleteConfirmationView ] = useState(false);
  const [ confirmationView, setConfirmationView ] = useState(false);
  const [ editModal, setEditModal ] = useState(false);
  const [ loadingFinish, setLoadingFinish ] = useState(false);
  const [ scheduleService, setScheduleService ] = useState({});
  const [ value ] = useStorage("userInfo", {});

  const { data } = useGetServices();

  useEffect(() => {
    if(data){
      data.forEach(service => {
        if(Number(service.id) === Number(schedule.service_id)) return setScheduleService(service)
      });
    }
  }, [data]);

  async function handleFinishSchedule() {
    setLoadingFinish(true);
    try {
      await finishSchedule(value.token, schedule.id);
    } catch (error) {
      console.log(error);
      alert('Ouve um erro ao finalizar o agendamento!')
    }
    setLoadingFinish(false);
    setConfirmationView(false);
    refetch();
  }

  return (
    <ScheduleContainer>
      {editModal ? <EditScheduleModal setVisible={setEditModal} schedule={schedule} service={scheduleService} /> : <></>}
      <IconContext.Provider value={{ className: 'icons' }} >

        <TopContext>
          <ClientInfo>
            <p><strong>Cliente:</strong> {schedule.clientName}</p>
            <p><strong>Horário:</strong> {schedule.hour}h</p>
            <p><strong>Serviço:</strong> {Number(schedule.service_id) === 5 ? "Indisponibilidade" : (scheduleService ? scheduleService.name : '')}</p>
            <p><strong>Data:</strong> {dayjs(schedule.date).format('DD/MM')}</p>
          </ClientInfo>
          <SideButtonsArea>
            {Number(schedule.service_id) === 5 ? <></> : 
              <SideButton onClick={() => setEditModal(!editModal)} ><HiOutlinePencil /></SideButton>
            }
            <SideButton onClick={() => setDeleteConfirmationView(true)} >
              <BsTrash />
            </SideButton>
            <DeleteScheduleComponent scheduleId={schedule.id} confirmationView={deleteConfirmationView} setConfirmationView={setDeleteConfirmationView} />
          </SideButtonsArea>
        </TopContext>
        {Number(schedule.service_id) === 5 ? <></> : 
          <EndButton onClick={() => setConfirmationView(true)} >
            {loadingFinish ?
              <Oval
              height={20}
              width={20}
              color="#fff"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#FFA3CF"
              />
              :
              <>Finalizar</>
            }
          </EndButton>
        }
        {confirmationView ? <Confirmation setConfirmationView={setConfirmationView} confirmationFunction={handleFinishSchedule} >Deseja finalizar esse agendamento?</Confirmation> : <></> }

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
    margin-bottom: 2px;
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