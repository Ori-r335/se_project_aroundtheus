export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this.isLiked = data.isLiked;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handeImageClick(this._name, this._link);
    });

    // Handle delete button click
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  checkLikeState() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  toggleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null; // Avoid memory leaks
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
    this.checkLikeState();
    // Return the populated card element
    return this._cardElement;
  }
}
