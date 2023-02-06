import { useState } from "react";

export const useForm = ( initValue = {} ) => {
  const [ form, setForm ] = useState(initValue);

  function resetForm(maintain) {
    setForm({
      ...form,
      ...maintain
    });
  }

  function handleForm(event) {
    if(event.target){
      setForm({
        ...form,
        [event.target.name]: event.target.value
      });
    }else{
      setForm({
        ...form,
        date: event
      });
    }
  };

  return [form, handleForm, resetForm];

}