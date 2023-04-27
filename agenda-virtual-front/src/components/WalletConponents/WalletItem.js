import styled from "styled-components";

const WalletItem = ({ transaction }) => {
  return (
    <Label type={transaction.type}>
      transaction
    </Label>
  )
}

export default WalletItem;

const colors = {
  green: "#00C058",
  red: "#FF5353"
}

const Label = styled.div`
  color: ${props => props.type === "ENTRY" ? colors.green : colors.red};
  margin: 5px;
`;