import styled from "styled-components";

const WalletItem = ({ transaction }) => {
  return (
    <Label type={transaction.type}>
      <p>{transaction.description}</p>
      <p>R$ {transaction.value},00</p>
    </Label>
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

  p{
    color: ${props => props.type === "ENTRY" ? colors.green : colors.red};
    font-size: 16px;
  }
`;