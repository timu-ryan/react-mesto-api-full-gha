import React from 'react';
import { Link } from 'react-router-dom';

const AuthComponent = ({header, buttonText, isRegister, formValue, handleSubmit, handleChange}) => {
  return (
    <div className="auth">
      <div className='auth__container'>
        <h2 className="auth__header">{header}</h2>
        <form 
          action="" 
          onSubmit={handleSubmit} 
          // name={props.name} 
          className="auth__form auth__form_object_delete-card"
        >
          <input
            id="place-email-input-reg"
            type="email"
            value={formValue.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            required
            className="auth__input auth__input_place_name"
          />
          <input
            id="place-passwor-input-reg"
            type="password"
            value={formValue.password}
            onChange={handleChange}
            name="password"
            placeholder="Пароль"
            required
            className="auth__input auth__input_place_link"
          />
          <button type="submit" onSubmit={handleSubmit} className="auth__button auth__button_delete-card">{buttonText}</button>
        </form>
        <div className="auth__signin">
          {isRegister && <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>}
        </div>
      </div>
    </div>
  )
}

export default AuthComponent