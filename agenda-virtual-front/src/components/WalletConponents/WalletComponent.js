import styled from "styled-components";
import WalletItem from "./WalletItem";
import { getAllTransaction } from "../../services/api";
import { useQuery } from "react-query";
import useStorage from "../../hooks/useStorage";
import { useEffect } from "react";

const WalletComponent = () => {

  const [ value ] = useStorage("userInfo", {});
  const { data, isLoading, error, refetch } = useQuery('get-transactions', handleGetTransactions);

  async function handleGetTransactions() {
    return await getAllTransaction(value.token);
  }

  useEffect(() => {
    refetch();
  }, [])

  return (
    <>
      <Label>Movimentações</Label>
      <Container>
        {data ?
          data.data.map(transaction => <WalletItem key={transaction.id} transaction={transaction} />)
        : <></>}
        
      </Container>
    
    </>
  )
}

export default WalletComponent;

const Container = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: #fff;
  padding: 15px 5px;
`;

const Label = styled.div`
  color: #fff;
  font-size: 16px;
  margin: 5px;
`;