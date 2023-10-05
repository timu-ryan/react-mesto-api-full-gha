import React from 'react'
import AuthComponent from './AuthComponent'
import { useState } from 'react' //--
//import * as userAuth from '../userAuth.js'; //--
// import { Navigate, useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [formValue, setFormValue] = useState({ //--
    email: '',
    password: ''
  })
  // const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    onLogin(formValue);
  }

  return (
    <AuthComponent 
      header={`Вход`} 
      buttonText={`Войти`}
      isRegister={false}
      formValue={formValue} //--
      handleSubmit={handleSubmit} //--
      handleChange={handleChange} //--
    />
  )
}

export default Login