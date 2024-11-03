function showErrorMessage(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass); // Add error styling
  errorEl.textContent = inputEl.validationMessage; // Display the message
  errorEl.classList.add(config.errorClass); // Make the message visible
}

function hideErrorMessage(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass); // Remove error styling
  errorEl.textContent = ""; // Clear the message
  errorEl.classList.remove(config.errorClass); // Hide the message
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showErrorMessage(formEl, inputEl, config);
  } else {
    hideErrorMessage(formEl, inputEl, config);
  }
}

function toggleButtonState(inputElements, submitButton, config) {
  const isFormValid = inputElements.every(
    (inputEl) => inputEl.validity.valid && inputEl.value !== ""
  );

  if (isFormValid) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false; // Enable the button
  } else {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true; // Disable the button
  }
}

function setEventListeners(formEl, config) {
  const inputElements = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
