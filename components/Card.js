export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeBtn();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteBtn();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handeImageClick(this._name, this._link);
    });
  }

  _handleLikeBtn() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteBtn() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    const cardTitle = this._cardElement.querySelector(".card__title");

    // Set the image source and title
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    // Return the populated card element
    return this._cardElement;
  }
}
