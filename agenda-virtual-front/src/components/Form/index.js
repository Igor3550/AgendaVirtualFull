import * as React from 'react';
import styled from "styled-components";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { hoursList } from '../utils/getHoursList';
import { useGetServices } from '../../hooks/Api/useServices';

export const InputArea = ({ ...otherProps }) => {
  return (
    <Input {...otherProps} />
  )
}

export const SelectArea = ({ ...otherProps }) => {

  const {data, isLoading} = useGetServices();

  return (
    <Select {...otherProps}>
      <option value='0' label='Service' />
      {isLoading ? 
      <></>
      : data ?
        data.map(option => {
          return <option key={option.id} value={option.id} label={option.name} />
        })
        : <></>
      }
    </Select>
  )
}

export const DateSelect = ({label, value, handleForm }) => {
  return (
    <Calendar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className='date-picker'
          label={label}
          inputFormat="DD/MM/YYYY"
          openTo="day"
          views={['day']}
          value={value}
          onChange={handleForm}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DateInput ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
      </LocalizationProvider>
    </Calendar>
  );
}

export const HoursSelect = ({ name, dayHours, title, selectedHour, handleForm, editException, service }) => {
  const [hoursExceptList, setHoursExceptList] = React.useState({});

  function handleClick(value) {
    const event = {target:{
      name:name,
      value
    }}
    handleForm(event);
  }

  React.useEffect(() => {
    if(!editException) return console.log(editException);
    if(!service) return console.log('');
    let hoursExcept = {};

    for(let i=0; i<service.duration; i++){
      hoursExcept[i+editException] = true;
    };

    setHoursExceptList(hoursExcept);
  }, [])

  return (
    <HoursArea>
      <p>{title}</p>
      <div>
        {hoursList.map((hour, index) => {
          if(selectedHour === hour){
            return <SelectedHour key={index}>{hour}h</SelectedHour>
          }
          return <Hour key={index} name={name} state={(dayHours[hour] || hoursExceptList[hour]) ? true : false} onClick={(dayHours[hour] || hoursExceptList[hour]) ? ()=>handleClick(hour) : () => {}} >{hour}h</Hour>;
        })}
      </div>
    </HoursArea>
  );
}

const Input = styled.input`
  width: 80%;
  height: 60px;
  background-color: #FFA3CF;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  border: 0;
  outline: none;
  margin: 10px 0;
  padding: 10px;

  ::placeholder{
    color: #fff;
    opacity: 0.7;
  }

  @media (max-width: 800px){
    width: 100%;
    height: 50px;
    font-size: 16px;
  }
`;

const Select = styled.select`
  width: 80%;
  height: 60px;
  background-color: #FFA3CF;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  border: 0;
  margin: 10px 0;
  outline: none;
  padding: 10px;

  @media (max-width: 800px){
    width: 100%;
    height: 50px;
    font-size: 16px;
  }
`;

const Calendar = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 5px 0;
  color: #fff;
  margin-bottom: 10px;

  .date-picker{
    height: 40px;
  }
`;

const DateInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: #FFA3CF;
  font-size: 16px;
  color: #fff;
  border-radius: 10px;
  border: 1px solid #fff;
  outline: none;
  padding: 10px;

  ::placeholder{
    color: #fff;
    opacity: 0.7;
  }

`;

const HoursArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFA3CF;
  padding: 5px;
  border-radius: 10px;
  margin: 15px 0;

  p{
    font-size: 15px;
    color: #fff;
  }

  div{
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    flex-wrap: wrap;
  }

`;

const Hour = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.state ? '#fff' : '#A3A3A3'};
  border-radius: 5px;
  color: ${(props) => props.state ? '#FF5CA1' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  font-size: 12px;

  :hover{
    ${(props) => props.state ? 'cursor: pointer;' : ''};
  }
`;

const SelectedHour = styled.div`
  width: 30px;
  height: 30px;
  background-color: #FF5CA1;
  border-radius: 5px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;

  :hover{
    ${(props) => props.state ? 'cursor: pointer;' : ''};
  }
`;