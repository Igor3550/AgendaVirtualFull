import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { MdPersonAddAlt1, MdPersonAddAlt, MdPersonSearch, MdOutlinePersonSearch } from "react-icons/md";
import { BsPersonCheckFill, BsPersonCheck, BsPeople, BsPeopleFill } from "react-icons/bs";

export function NavigationBar() {
  const location = useLocation();

  function checkSelected(selected){
    if(`/${selected}` === location.pathname) return true;
    return false;
  }

  return(
      <Container>
    <IconContext.Provider value={{className:'icons'}}>

        <Link to='/dashboard/toSchedule'>
          {checkSelected('dashboard/toSchedule') ?
            <MdPersonAddAlt1 />
            :
            <MdPersonAddAlt />
          }
        </Link>
        <Link to='/dashboard/schedules'>
          {checkSelected('dashboard/schedules') ?
            <BsPersonCheckFill />
            :
            <BsPersonCheck />
          }
        </Link>
        <Link to='/dashboard/history'>
          {checkSelected('dashboard/history') ?
            <MdPersonSearch />
            :
            <MdOutlinePersonSearch />
          }
        </Link>
        <Link to='/dashboard/waiting'>
        {checkSelected('dashboard/waiting') ?
            <BsPeopleFill />
            :
            <BsPeople />
          }
        </Link>
    

    </IconContext.Provider>
      </Container>
  )
}

const Container = styled.div`
  width: 780px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #FFA3CF;
  border-radius: 0 0 10px 10px;

  .icons {
		color: #ffffff;
		font-size: 30px;
  }

  @media (max-width: 800px){
    width: 100%;
    border-radius: 0;
  }
`;