import styled from "styled-components";
import WalletItem from "./WalletItem";
import { getAllTransaction } from "../../services/api";
import { useQuery } from "react-query";
import useStorage from "../../hooks/useStorage";
import { useEffect } from "react";
import { useState } from "react";
import { CreateTransactionModal } from "./CreateTransactionModal";

const WalletComponent = ({ refetchController }) => {

  const [ value ] = useStorage("userInfo", {});
  const [ totalWallet, setTotalWallet ] = useState(0);
  const [ createTransactionView, setCreateTransactionView ] = useState(false);
  const [ createWithDrawTransactionView, setCreateWithDrawTransactionView ] = useState(false);
  const { data, isLoading, error, refetch } = useQuery('get-transactions', handleGetTransactions);

  async function handleGetTransactions() {
    const response = await getAllTransaction(value.token);
    setTotalWallet(calculateTotal(response.data));
    return response;
  }

  function calculateTotal(list) {
    let total = 0;
    for(let i = 0; i<list.length; i++){
      const item = list[i];
      if(item.type === "ENTRY"){
        total = total + item.value;
      }else{
        total = total - item.value;
      }
    }
    return total;
  }

  useEffect(() => {
    refetch();
  }, [refetchController])

  return (
    <>
      {createTransactionView ? <CreateTransactionModal setModalView={setCreateTransactionView} transactionType="ENTRY" /> : <></> }
      {createWithDrawTransactionView ? <CreateTransactionModal setModalView={setCreateWithDrawTransactionView} transactionType="WITHDRAW" /> : <></> }
      <Label>Movimentações</Label>
      <Container>
        {data ?
          data.data.map(transaction => <WalletItem key={transaction.id} transaction={transaction} />)
        : <></>}
      </Container>
      <TotalArea>
        <div>Total</div>
        <div>R$ {totalWallet},00</div>
      </TotalArea>
      <ButtonArea>
        <Button onClick={() => setCreateTransactionView(true)} >+ Adicionar</Button>
        <Button onClick={() => setCreateWithDrawTransactionView(true)} type="cancel">- Retirar</Button>
      </ButtonArea>
    </>
  )
}

export default WalletComponent;

const Container = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  padding: 15px 5px;
  overflow-y: auto;
`;

const Label = styled.div`
  color: #fff;
  font-size: 16px;
  margin: 5px;
`;

const TotalArea = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FF5CA1;
  border-top: 1px solid #FF5CA1;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const Button = styled.button`
  width: 30%;
  height: 45px;
  color: #fff;
  background-color: #FFA3CF;
  font-size: 20px;
  text-align: center;
  border: 0;
  border-radius: 10px;
  margin: 10px;
  :hover{
    cursor: pointer;
  }
  ${props => props.type === "cancel" ?
    `
    background-color: #FF5CA1;
    color: #fff;
    border: 1px solid #fff;
    `
  : ''
  }
`;