class Api {
  constructor(config) {
    this._url = config.url;
    //this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return fetch(`${this._url}/cards`, fetchOptions)
      .then(res => this._getResponseData(res));
  }

  getUserInfo() {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return fetch(`${this._url}/users/me`, fetchOptions)
      .then(res => this._getResponseData(res));
  }
  //editMyProfile
  setUserInfo(newName, newDescription) {
    const fetchOptions = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: newName,
        about: newDescription
      }),
    };
    return fetch(`${this._url}/users/me`, fetchOptions)
    .then(res => this._getResponseData(res));
  }

  setNewCard(newCardName, newCardLink, isUser) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
        isUser: isUser,
      }),
    };
    return fetch(`${this._url}/cards`, fetchOptions)
      .then(res => this._getResponseData(res));
  }

  setLikeCard(cardId) {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return fetch(`${this._url}/cards/${cardId}/likes`, fetchOptions)
      .then(res => this._getResponseData(res));
  }

  removeLikeCard(cardId) {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return fetch(`${this._url}/cards/${cardId}/likes`, fetchOptions)
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, like) {
    const fetchOptions = {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return fetch(`${this._url}/cards/likes/${cardId}`, fetchOptions)
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return fetch(`${this._url}/cards/${cardId}`, fetchOptions)
      .then(res => this._getResponseData(res));
  }

  setNewAvatar(data) {
    const fetchOptions = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        avatar: data,
      }),
    };
    return fetch(`${this._url}/users/me/avatar`, fetchOptions)
      .then(res => this._getResponseData(res));
  }
}

export default new Api({
  url: "https://api.timuryanst.nomoredomainsrocks.ru",
});
