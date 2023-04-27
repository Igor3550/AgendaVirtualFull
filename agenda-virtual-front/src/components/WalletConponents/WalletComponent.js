import styled from "styled-components";
import WalletItem from "./WalletItem";
import { getAllTransaction } from "../../services/api";
import { useQuery } from "react-query";
import useStorage from "../../hooks/useStorage";

const WalletComponent = () => {

  const [ value ] = useStorage("userInfo", {});
  const { data, isLoading, error, refetch } = useQuery('get-transactions', handleGetTransactions);

  async function handleGetTransactions() {
    return await getAllTransaction(value.token);
  }

  return (
    <Container>
      {data ?
        data.data.map(transaction => <WalletItem key={transaction.id} transaction={transaction} />)
      : <></>}
      
    </Container>
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