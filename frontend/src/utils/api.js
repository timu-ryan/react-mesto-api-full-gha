class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
     return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res));
  }
  //editMyProfile
  setUserInfo(newName, newDescription) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
    .then(res => this._getResponseData(res));
  }

  setNewCard(newCardName, newCardLink, isUser) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
        isUser: isUser,
      })
    })
    .then(res => this._getResponseData(res));
  }
  
  setLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res));
  }

  removeLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res));
  }

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      })
    })
    .then(res => this._getResponseData(res));
  }
}

export default new Api({
  url: "https://api.timuryanst.nomoredomainsrocks.ru",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
