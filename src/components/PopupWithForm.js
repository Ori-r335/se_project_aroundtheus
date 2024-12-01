import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector); //if I remove this the cards disappear
    this._handleFormSubmit = handleFormSubmit;
    this._formPopup = this._popupElement.querySelector(".modal__form");
    this._inputList = this._formPopup.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  formReset() {
    this._formPopup.reset();
  }

  getForm() {
    return this._formPopup;
  }
}
