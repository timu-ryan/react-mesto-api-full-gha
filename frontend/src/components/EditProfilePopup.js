import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  } 
  return (
    <>
      <PopupWithForm 
          name="edit" 
          title="Редактировать профиль" 
          buttonText="Сохранить"
          isOpen={isOpen} 
          onClose={onClose}
          handleSubmit={handleSubmit}
        >
          <label className="popup__field">
            <input
              id="name-input"
              value={name || ''}
              onChange={handleNameChange}
              type="text"
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              className="popup__input popup__input_text_name"
            />
            <span className="name-input-error popup__input-error"></span>
          </label>
          <label className="popup__field">
            <input
              id="description-input"
              value={description || ''}
              onChange={handleDescriptionChange}
              type="text"
              name="description"
              placeholder="Описание"
              required
              minLength="2"
              maxLength="200"
              className="popup__input popup__input_text_description"
            />
            <span className="description-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
