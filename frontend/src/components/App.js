import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

// import AuthComponent from './AuthComponent';
import Login from './Login';
import Register from './Register';
// import SignIn from './SignIn';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

// import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteElement from './ProtectedRoute';

import * as userAuth from '../utils/userAuth.js'; //--


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isRegistrationSuccesful, setIsRegistrationSuccesful] = useState(true)
  const [selectedCard, setSelectedCard] = useState({})

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo)
          setCards([...initialCards]);
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, [])

  const tokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      if (token){
        userAuth.getContent(token)
          .then((res) => {
            if (res){
              // setUserData({
              //   // username: res.username,
              //   email: res.data.email
              // })
              setEmail(res.data.email)
              // авторизуем пользователя
              setLoggedIn(true);
              // setUserData(userData);
              navigate("/", {replace: true})
            }
          })
          .catch(err => console.log(err));
      }
    }
   }


  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(()=>{
        setCards(cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {  
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({})
  }

  const handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.setNewAvatar(avatar)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  const handleAddPlace = ({name, link}) => {
    api.setNewCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // const handleRegistrationSubmit = () => {
  //   setIsInfoToolTipOpen(true);
  // }

  
  // const handleLogin = (email) => {
  // }

  const handleLoginSubmit = (formValue) => {
    userAuth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          setEmail(formValue.email);
          setLoggedIn(true);
          // setFormValue({email: '', password: ''});
          // handleLogin(formValue.email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  const handleSuccessfulRegistration = () => {
    setIsRegistrationSuccesful(true);
    setIsInfoToolTipOpen(true);
    navigate('/sign-in', {replace: true});
  }
  const handleFailedRegistration = () => {
    setIsRegistrationSuccesful(false);
    setIsInfoToolTipOpen(true);
  }
  const handleRegistrationSubmit = (formValue) => {
    const { password, email } = formValue;
    userAuth.register(password, email)
      .then(() => {
          handleSuccessfulRegistration()
      })
      .catch((err)=> {
        handleFailedRegistration();
        console.log(err)}
      );
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
    <div className="page">
      
      <Routes>
        <Route path="/" element={
          <>
            <ProtectedRouteElement 
              element={Header}
              linkText={`Выйти`} 
              linkTo={`/sign-in`}
              loggedIn={loggedIn}
              email={email}
            />
            {/* <Header /> */}
            <ProtectedRouteElement 
              element={Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
            <Footer />
          </>
          }
        />

        <Route path="/sign-up" element={
          <>
            <Header linkText={`Войти`} linkTo={`/sign-in`}/>
            <Register 
              // handleClick={handleRegistrationSubmit}
              // onSuccessful={handleSuccessfulRegistration}
              // onFailed={handleFailedRegistration}
              handleRegister={handleRegistrationSubmit}
            />
          </>}
        />
        <Route path="/sign-in" element={
          <>
            <Header linkText={`Регистрация`} linkTo={`/sign-up`}/>
            <Login onLogin={handleLoginSubmit} />
          </>
        }/>
        <Route path="*" element={<Navigate to="/sign-in" replace/>}/>
      </Routes>

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlace}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      

      <PopupWithForm 
        name="delete-card" 
        title="Вы уверены?" 
        buttonText="Да"
        isOpen={false} 
        onClose={closeAllPopups}
      ></PopupWithForm >

      <InfoTooltip 
        isOpen={isInfoToolTipOpen} 
        onClose={closeAllPopups} 
        isSuccess={isRegistrationSuccesful}
        headerSuccessText="Вы успешно зарегистрировались!"
        headerFailText="Что-то пошло не так! Попробуйте ещё раз."
      />

    </div>
    </CurrentUserContext.Provider> 
  );
}

export default App;
