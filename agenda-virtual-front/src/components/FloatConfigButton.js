import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiFillSetting } from "react-icons/ai";

const FloatConfigButton = ({ ...otherProps }) => {
  return (
    <Button {...otherProps} >
      <IconContext.Provider value={{className:'icons'}}>
        <AiFillSetting />
      </IconContext.Provider>
    </Button>
  )
}

export default FloatConfigButton;

const Button = styled.button`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 350px;
  bottom: 140px;

  border-radius: 20px;
  background-color: #FFF;
  border: 1px solid #FFA3CF;

  .icons{
		color: #FF5CA1;
		font-size: 30px;
  }

  @media(max-width: 800px) {
    width: 40px;
    height: 45px;
    left: 40%;
    bottom: 120px;
  }
`;