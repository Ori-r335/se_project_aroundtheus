import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/Constants.js";
import "../pages/index.css";

//specifice modal selector
const profileModalEdit = document.querySelector("#modal-edit");
const profileModalAdd = document.querySelector("#modal-add");
// const profileModalImage = document.querySelector("#modal-image");

// open buttons
// const editBtnClick = document.querySelector(".profile__edit-button");
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
// const imagePreview = profileModalImage.querySelector(".modal__image-preview");
// const titlePreview = profileModalImage.querySelector(".modal__title-preview");

//cards
const cardList = document.querySelector(".cards__list");
// const template = document.querySelector("#card-template").content;
// const cardTemplate = template.querySelector(".card");
// const cardTemplateSelector = "#card-template";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
// const profileEditForm = document.forms["modal-form-edit"];
// const addCardForm = document.forms["modal-form-add"];

// ---------- User Info ----------
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

// ---------- Popups ----------
// Profile Edit Popup
const profileEditPopup = new PopupWithForm("#modal-edit", handleFormSubmitEdit);
profileEditPopup.setEventListeners();

// Profile Add Popup
const addCardPopup = new PopupWithForm("#modal-add", handleFormSubmitAdd);
addCardPopup.setEventListeners();

// Image Preview Popup
const imagePopup = new PopupWithImage("#modal-image");
imagePopup.setEventListeners();

//------------------EventListeners of forms----------------//

addNewCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

//EDIT submit function
function handleFormSubmitEdit() {
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems(); // Render initial cards

function renderCard(data, wrapper) {
  const cardElement = createCard(data);
  wrapper.prepend(cardElement);
}

function handleFormSubmitAdd() {
  const cardData = { name: inputTitleAdd.value, link: inputUrlAdd.value };
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement); // Add to top of the list
  addCardPopup.close();
  addCardPopup.formReset();
}

initialCards.forEach((data) => renderCard(data, cardList));

// ---------- Functions ----------
// Create Card Function
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (name, link) => {
    imagePopup.open({ name, link });
  });
  return card.generateCard();
}

// ---------- Event Listeners ----------
// Open Profile Edit Popup
editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputSubtitle.value = userData.job;

  profileEditPopup.open();
});

const formElements = document.querySelectorAll(".modal__form");
const formValidators = {};

formElements.forEach((formEl) => {
  const formValidator = new FormValidator(config, formEl);
  const formName = formEl.getAttribute("name");
  formValidators[formName] = formValidator;
});

formValidators.addCardForm.enableValidation();
formValidators.profileForm.enableValidation();

// Open Profile ADD Popup
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
