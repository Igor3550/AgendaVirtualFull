import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useStorage from "../../hooks/useStorage";
import { deleteInvalidDate } from "../../services/api";
import { Confirmation } from "../Confirmation";

const InvalidDateComponent = ({ invalidDate }) => {
  const navigate = useNavigate();

  const [ value, setValue ] = useStorage("userInfo", {});
  const [ deleteConfirmationView, setDeleteConfirmationView ] = useState(false);

  async function handleDeleteInvalidDate() {
    try {
      await deleteInvalidDate(value.token, invalidDate.id);
      alert("Deletado com sucesso!");
      setDeleteConfirmationView(false);
    } catch (error) {
      console.log(error);
      if(error.response.status === 401) {
        alert("Usuario sem autorização!");
        setValue({});
        navigate("/");
      }
      alert('Erro ao deletar essa data!')
    }
  }

  return (
    invalidDate ?
      <Label>
        {deleteConfirmationView ? <Confirmation setConfirmationView={setDeleteConfirmationView} confirmationFunction={handleDeleteInvalidDate}><p>Deseja deletar essa data?</p></Confirmation> : <></>}
        <span>{dayjs(invalidDate.date).format("DD/MM")}</span>
        <span>{invalidDate.description}</span>
        <div onClick={() => setDeleteConfirmationView(true)}>X</div>
      </Label>
    : <></>
  )
}

export default InvalidDateComponent;

const Label = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  color: #00A9C0;
  font-size: 16px;

  div{
    color: #FF5353;
    min-width: 100px;
  }

  span{
    min-width: 40px;
  }
`;