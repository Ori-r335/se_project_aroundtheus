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

// open buttons
const addNewCardBtn = document.querySelector(".profile__add-button");
const avatarBtn = document.querySelector(".profile__avatar-button");
const editProfileButton = document.querySelector(".profile__edit-button");

//text in the edit form
const inputName = profileModalEdit.querySelector("#name");
const inputSubtitle = profileModalEdit.querySelector("#subtitle");

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
addCardPopup.setEventListeners();

// Image Preview Popup
const imagePopup = new PopupWithImage("#modal-image");
imagePopup.setEventListeners();

// delete card Popup
const deleteImagePopup = new PopupWithConfirm("#modal-trash");
deleteImagePopup.setEventListeners();

const avatarChangePopup = new PopupWithForm(
  "#modal-update",
  handleFormSubmitAvatar
);
avatarChangePopup.setEventListeners();

//------------------EventListeners of forms----------------//

// Open Profile Edit Popup and set the data
editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  inputName.value = userData.name;
  inputSubtitle.value = userData.job;

  profileEditPopup.open();
});

// Open Profile Add Popup
addNewCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

// Open Profile avatar edit Popup
avatarBtn.addEventListener("click", () => {
  avatarChangePopup.open();
});

//----------------functions------------------//

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

//ADD submit function
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

//AVATAR submit function
function handleFormSubmitAvatar(inputData) {
  avatarChangePopup.renderLoading(true);
  api
    .editProfileAvatar(inputData) // Send the data to the server
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      avatarChangePopup.close();
      avatarChangePopup.formReset();
    })
    .catch((err) => {
      console.error("Error creating card:", err);
    })
    .finally(() => {
      avatarChangePopup.renderLoading(false);
    });
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

//delete card function
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

// CARDS
let cardSection;

api
  .getAppInfo()
  .then(([cards, userData]) => {
    cardSection = new Section(
      {
        items: cards.reverse(), // Pass fetched cards to Section
        renderer: renderCard,
      },
      ".cards__list"
    );

    cardSection.renderItems();

    //here we display that userinfo on the dom (visually)
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error("Error loading app info:", err);
  });

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
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

//---------------- handle Validators in forms ----------------//
const formElements = document.querySelectorAll(".modal__form");
const formValidators = {};

formElements.forEach((formEl) => {
  const formValidator = new FormValidator(config, formEl);
  const formName = formEl.getAttribute("name");
  formValidators[formName] = formValidator;
  formValidator.enableValidation();
});
