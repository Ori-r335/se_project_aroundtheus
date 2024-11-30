import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      ".modal__image-preview"
    );

    this._captionElement = this._popupElement.querySelector(
      ".modal__title-preview"
    );
  }

  open(cardData) {
    this._imageElement.src = cardData.link;
    this._imageElement.alt = cardData.name;
    this._captionElement.textContent = cardData.name;
    super.open();
  }
}
