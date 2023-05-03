import styled from "styled-components";
import { getAllInvalidDates } from "../../services/api";
import { useQuery } from "react-query";
import useStorage from "../../hooks/useStorage";
import InvalidDateComponent from "./InvalidDateComponent";

const InvalidDateList = () => {

  const [ value ] = useStorage('userInfo', {});
  const { data } = useQuery('get-invalidDate', handleGetInvalidDates);

  async function handleGetInvalidDates() {
    const response = await getAllInvalidDates(value.token);
    return response;
  }

  return (
    <>
      <Label>Datas inválidas para agendamento</Label>
      <Container>
      {data ?
          data.data.map(invalidDate => <InvalidDateComponent key={invalidDate.id} invalidDate={invalidDate} />)
        : <></>}
      </Container>
    </>
  )
}

export default InvalidDateList;

const Container = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #fff;
  padding: 15px 5px;
  overflow-y: auto;
`;

const Label = styled.div`
  color: #fff;
  font-size: 16px;
  margin: 5px;
`;