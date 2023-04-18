import useStorage from "../../hooks/useStorage";
import { deleteSchedule } from "../../services/clientsApi";
import { Confirmation } from "../Confirmation";

export const DeleteScheduleComponent = ({ scheduleId, confirmationView, setConfirmationView }) => {

  const [ value ] = useStorage('userInfo', {});

  async function handleDelete() {
    setConfirmationView(false);

    try {
      const response = await deleteSchedule(value.token, scheduleId);
      console.log(response.data);
      alert("Angendamento Deletado!");
      setConfirmationView(false);
    } catch (error) {
      console.log(error)
      alert("Ouve um erro ao alterar agendamento!");
    }
  }

  return (
    confirmationView ? 
      <Confirmation setConfirmationView={setConfirmationView} confirmationFunction={handleDelete} >
        Deseja cancelar o agendamento?
      </Confirmation> 
    : <></>
  );
}