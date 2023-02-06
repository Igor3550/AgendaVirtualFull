import { deleteSchedule } from "../../services/api";
import { Confirmation } from "../Confirmation";

export const DeleteScheduleComponent = ({ scheduleId, confirmationView, setConfirmationView }) => {

  async function handleDelete() {
    setConfirmationView(false);

    try {
      const response = await deleteSchedule(scheduleId);
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