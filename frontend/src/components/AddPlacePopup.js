import React, { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  } 

  return (
    <>
      <PopupWithForm 
        name="new-item" 
        title="Новое место" 
        buttonText="Добавить"
        isOpen={isOpen} 
        onClose={onClose}
        handleSubmit={handleSubmit}
      >
        <label className="popup__field">
          <input
            id="place-name-input"
            type="text"
            value={name}
            onChange={handleNameChange}
            name="placeName"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            className="popup__input popup__input_place_name"
          />
          <span className="place-name-input-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            id="place-description-input"
            type="url"
            value={link}
            onChange={handleLinkChange}
            name="placeLink"
            placeholder="Ссылка на картинку"
            required
            className="popup__input popup__input_place_link"
          />
          <span className="place-description-input-error popup__input-error"></span>
        </label>
      </PopupWithForm>
    </>
  );
} 

export default AddPlacePopup;
