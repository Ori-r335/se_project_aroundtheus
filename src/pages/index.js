import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/Constants.js";
import "../pages/index.css";
import Api from "../components/Api.js";

//specifice modal selector
const profileModalEdit = document.querySelector("#modal-edit");
const profileModalAdd = document.querySelector("#modal-add");
const trashModal = document.querySelector("#modal-trash");
// const profileModalImage = document.querySelector("#modal-image");

// open buttons
// const editBtnClick = document.querySelector(".profile__edit-button");
const addNewCardBtn = document.querySelector(".profile__add-button");
const avatarBtn = document.querySelector(".profile__avatar-button");

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
const trashButton = document.querySelector(".card__trash-button");

// const profileEditForm = document.forms["modal-form-edit"];
// const addCardForm = document.forms["modal-form-add"];

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "6e6ca955-c2df-4d70-a35e-af9025599fa8",
  "Content-Type": "application/json",
});

// ---------- User Info ----------
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

// ---------- Popups ----------
// Profile Edit Popup
const profileEditPopup = new PopupWithForm("#modal-edit", handleFormSubmitEdit);
profileEditPopup.setEventListeners();

// Profile Add Popup
const addCardPopup = new PopupWithForm("#modal-add", handleFormSubmitAdd);
// const addCardPopup = new PopupWithForm("#modal-add", profileForm);
addCardPopup.setEventListeners();

// Image Preview Popup
const imagePopup = new PopupWithImage("#modal-image");
imagePopup.setEventListeners();

// delete card Popup
const deleteImagePopup = new PopupWithConfirm("#modal-trash");
deleteImagePopup.setEventListeners();

const AvatarChangePopup = new PopupWithForm(
  "#modal-update",
  handleFormSubmitAvatar
);
AvatarChangePopup.setEventListeners();

//------------------EventListeners of forms----------------//

addNewCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

avatarBtn.addEventListener("click", () => {
  AvatarChangePopup.open();
});

function handleFormSubmitAvatar(inputData) {
  AvatarChangePopup.renderLoading(true);
  api
    .editProfileAvatar(inputData) // Send the data to the server
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      AvatarChangePopup.close();
      AvatarChangePopup.formReset();
    })
    .catch((err) => {
      console.error("Error creating card:", err);
    })
    .finally(() => {
      AvatarChangePopup.renderLoading(false);
    });
}

function handleDeleteClick(card) {
  deleteImagePopup.open();
  // Set the action for the delete confirmation popup
  deleteImagePopup.setSubmitAction(() => {
    deleteImagePopup.renderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        deleteImagePopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        deleteImagePopup.renderLoading(false); // Reset the button text
      });
  });
}

//EDIT submit function
function handleFormSubmitEdit(data) {
  profileEditPopup.renderLoading(true);
  api
    .editProfile(data)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
      });
      userInfo.setUserAvatar(data.avatar);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile: ", err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });
}

//on page load we make a request to get the userinfo off the server
api.getUserInfo().then((data) => {
  //here we display that userinfo on the dom (visually)
  userInfo.setUserInfo({
    name: data.name,
    job: data.about,
  });
  userInfo.setUserAvatar(data.avatar);
});

let cardSection;
api
  .getAppInfo()
  .then(([cards, user]) => {
    cardSection = new Section(
      {
        items: cards.reverse(), // Pass fetched cards to Section
        renderer: renderCard,
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Error loading app info:", err);
  });

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

function handleFormSubmitAdd(inputData) {
  addCardPopup.renderLoading(true);
  api
    .createCardAdd(inputData) // Send the data to the server
    .then((data) => {
      renderCard(data); // Render using the server's response
      addCardPopup.close();
      addCardPopup.formReset();
    })
    .catch((err) => {
      console.error("Error creating card:", err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

// Create Card Function
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => {
      imagePopup.open({ name, link });
    },
    handleDeleteClick, // Handle delete card
    handleLikeClick
  );

  return card.generateCard();
}

//Likes function
function handleLikeClick(thisCard) {
  if (!thisCard.isLiked) {
    api
      .likeCard(thisCard._id)
      .then(() => {
        thisCard.toggleLike();
        thisCard.isLiked = !thisCard.isLiked;
      })
      .catch((err) => {
        console.error("Error creating card:", err);
      });
  } else {
    api
      .dislikeCard(thisCard._id)
      .then(() => {
        thisCard.toggleLike();
        thisCard.isLiked = !thisCard.isLiked;
      })
      .catch((err) => {
        console.error("Error creating card:", err);
      });
  }
}

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
  formValidator.enableValidation();
});

// Open Profile ADD Popup
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
