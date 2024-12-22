export default class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formEl = formEl;

    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputElements = [
      ...this._formEl.querySelectorAll(this._inputSelector),
    ];
  }

  showErrorMessage(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass); // Add error styling
    errorEl.textContent = inputEl.validationMessage; // Display the message
    errorEl.classList.add(this._errorClass); // Make the message visible
  }

  hideErrorMessage(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass); // Remove error styling
    errorEl.textContent = ""; // Clear the message
    errorEl.classList.remove(this._errorClass); // Hide the message
  }

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this.showErrorMessage(inputEl);
    } else {
      this.hideErrorMessage(inputEl);
    }
  }

  // toggleButtonState() {
  //   const isFormValid = this._inputElements.every(
  //     (inputEl) => inputEl.validity.valid && inputEl.value !== ""
  //   );

  toggleButtonState() {
    const isFormValid = this._inputElements.every(
      (inputEl) => inputEl.validity.valid
    );

    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this.disableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  setEventListeners() {
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this.checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
    // Initial check to update the button state when the form is loaded
    this.toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submitted.");
      // this.disableSubmitButton();
    });

    this.setEventListeners();
  }
}

// const formElement = document.querySelectorAll(".modal__form");
// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// formElement.forEach((formEl) => {
//   const formValidator = new FormValidator(config, formEl);
//   formValidator.enableValidation();
// });
