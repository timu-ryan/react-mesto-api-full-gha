import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );; 
  
  function handleClick() {
    onCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      <div className="card__description">
        <h2 className="card__text">{card.name}</h2>
        <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
        <p className="card__like-number">{card.likes.length}</p>
      </div>
      { isOwn &&
        <button 
          type="button" 
          aria-label="удалить" 
          onClick={handleDeleteClick}
          className="card__delete"
        >
          <div className="card__trash-lid"></div>
          <div className="card__trash"></div>
        </button>
      }
    </article>
  )
}

export default Card;
