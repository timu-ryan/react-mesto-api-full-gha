import React, { useContext, useEffect, useState } from "react";
import api from '../utils/api';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
    onEditProfile,
    onAddPlace,
    onEditAvatar, 
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
  }) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
      <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
        <button type="button" className="profile__pen" onClick={onEditAvatar}></button>
        <div>
          <div className="profile__name">
            <h1 className="profile__name-text">{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button" onClick={onAddPlace}></button>
      </section>

      <section className="cards">
        {cards.map(card => 
          <Card 
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )}
      </section>
    </main>
  );
}

export default Main;
