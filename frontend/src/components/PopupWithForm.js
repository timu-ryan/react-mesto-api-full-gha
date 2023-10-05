import React from "react";

const PopupWithForm = (props) => {
  return (
    <div className={`
      popup popup_${props.name} 
      ${props.isOpen ? 'popup_opened' : ''}
    `}>
      <div className="popup__container">
        <h2 className="popup__header">{props.title}</h2>
        <form 
          action="" 
          onSubmit={props.handleSubmit} 
          name={props.name} 
          className="popup__form popup__form_object_delete-card"
        >
          {props.children}
          <button type="submit" className="popup__button popup__button_delete-card">{props.buttonText}</button>
        </form>
        <button 
          onClick={props.onClose}
          type="button" 
          aria-label="Закрыть" 
          className="popup__close popup__close_button_delete-card"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
