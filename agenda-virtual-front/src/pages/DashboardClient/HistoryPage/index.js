import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getHistory } from "../../../services/api";
import { InputArea } from "../../../components/Form";
import { HistoryComponent } from "../../../components/History/History-component";

const HistoryPage = () => {
  const [ clientName, setClientName ] = useState('');
  const { data, isLoading, refetch } = useQuery('get-history', handleGetHistory);

  async function handleGetHistory() {
    return await getHistory(clientName);
  }

  useEffect(() => {
    refetch();
  }, [clientName]);

  return (
    <Container>
      <InputArea placeholder='Pesquisar por cliente' value={clientName} onChange={(e) => setClientName(e.target.value)} />
      <Label>Histórico</Label>
      {isLoading ?
        <Oval
          height={20}
          width={20}
          color="#fff"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#FFA3CF"
        />
      :
        data ?
          data.map(schedule => <HistoryComponent schedule={schedule} />)
        : <></>
      }
    </Container>
  );
}

export default HistoryPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  width: 100%;
  height: 30px;
  color: #fff;
  background-color: #FFA3CF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin: 10px 0;
  padding: 5px 0;
`;