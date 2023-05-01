import dayjs from "dayjs";
import styled from "styled-components";

const WalletItem = ({ transaction }) => {
  return (
    transaction ?
    <Label type={transaction.type}>
      <span>{dayjs(transaction.createdAt).format("DD/MM")}</span>
      <Description>{transaction.description}</Description>
      <div>R$ {transaction.value},00</div>
    </Label>
    : <></>
  )
}

export default WalletItem;

const colors = {
  green: "#00C058",
  red: "#FF5353"
}

const Label = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  color: ${props => props.type === "ENTRY" ? colors.green : colors.red};
  font-size: 16px;

  div{
    min-width: 100px;
  }

  span{
    min-width: 60px;
  }
`;

const Description = styled.div`
  width: 200px;
`;