import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

//specifice modal selector
const profileModalEdit = document.querySelector("#modal-edit");
const profileModalAdd = document.querySelector("#modal-add");
const profileModalImage = document.querySelector("#modal-image");

// open buttons
const editBtnClick = document.querySelector(".profile__edit-button");
const addNewCardBtn = document.querySelector(".profile__add-button");

// close button
const closeButtons = document.querySelectorAll(".modal__close-button");

//text in the edit form
const profileSection = document.querySelector(".profile");
const profileName = profileSection.querySelector(".profile__title");
const profileSubtitle = profileSection.querySelector(".profile__subtitle");
const inputName = profileModalEdit.querySelector("#name");
const inputSubtitle = profileModalEdit.querySelector("#subtitle");

// form
const profileFormSubmitEdit =
  profileModalEdit.querySelector("#modal-form-edit");
const profileFormSubmitAdd = profileModalAdd.querySelector("#modal-form-add");

//text data in add form
const inputTitleAdd = profileFormSubmitAdd.querySelector("#add-title");
const inputUrlAdd = profileFormSubmitAdd.querySelector("#image-url");

//text in preview image
const imagePreview = profileModalImage.querySelector(".modal__image-preview");
const titlePreview = profileModalImage.querySelector(".modal__title-preview");

//cards
const cardList = document.querySelector(".cards__list");
const template = document.querySelector("#card-template").content;
const cardTemplate = template.querySelector(".card");
const cardTemplateSelector = "#card-template";

//------------------functions of forms----------------------//

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

//---------------------------------------------------------//

//------------------EventListeners of forms----------------//

editBtnClick.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openPopup(profileModalEdit);
});

addNewCardBtn.addEventListener("click", () => {
  openPopup(profileModalAdd);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// submit of edit form :
profileFormSubmitEdit.addEventListener("submit", handleFormSubmitEdit);
profileFormSubmitAdd.addEventListener("submit", handleFormSubmitAdd);

//-------------------------------------------------------//

//EDIT submit function
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(profileModalEdit);
}

function renderCard(data, wrapper) {
  const card = new Card(data, cardTemplateSelector, handleImageClick);
  const cardElement = card.generateCard();
  wrapper.prepend(cardElement);
}

function handleImageClick(name, link) {
  openPopup(profileModalImage);
  imagePreview.src = link;
  imagePreview.alt = name;
  titlePreview.textContent = name;
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const name = inputTitleAdd.value;
  const link = inputUrlAdd.value;
  //sends the data
  renderCard({ name, link }, cardList);
  closePopup(profileModalAdd);
  evt.target.reset();
}

initialCards.forEach((data) => renderCard(data, cardList));

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened"); // Get the currently opened modal
    if (openModal) {
      closePopup(openModal);
    }
  }
}

const modals = [profileModalEdit, profileModalAdd, profileModalImage];
modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}

const formElement = document.querySelectorAll(".modal__form");
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

formElement.forEach((formEl) => {
  const formValidator = new FormValidator(config, formEl);
  formValidator.enableValidation();
});
