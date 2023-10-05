import React from 'react'
import AuthComponent from './AuthComponent'
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
//import * as userAuth from '../userAuth.js';

const Register = ({ handleRegister }) => {
  
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })
  //const navigate = useNavigate();

  // const onSuccessfulRegistration = () => {
  //   onSuccessful();
  //   navigate('/sign-in', {replace: true});
  // }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister(formValue)
  } 

  return (
    <AuthComponent 
      header={`Регистрация`} 
      buttonText={`Зарегистрироваться`}
      isRegister={true}
      formValue={formValue}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  )
}

export default Register