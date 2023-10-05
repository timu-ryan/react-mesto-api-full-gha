import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_card ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
          type="button" 
          aria-label="Закрыть" 
          onClick={onClose}
          className="popup__close popup__close_button_card"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-description">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
