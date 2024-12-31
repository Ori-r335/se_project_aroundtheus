export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this._headers,
      ...options,
    };
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, finalOptions).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  editProfile(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.subtitle,
      }),
    });
  }

  getInitialCards() {
    return this._request("/cards");
  }

  createCardAdd(data) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({
        name: data.title,
        link: data.url,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  editProfileAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.url,
      }),
    });
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
