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
const editCloseBtn = profileModalEdit.querySelector(".modal__close-button");
const addCloseBtn = profileModalAdd.querySelector(".modal__close-button");
const imageCloseBtn = profileModalImage.querySelector(".modal__close-button");

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
const imagePreview = profileModalImage.querySelector(".card__image-preview");
const titlePreview = profileModalImage.querySelector(".modal__title_preview");

//cards
const cardList = document.querySelector(".cards__list");
const template = document.querySelector("#card-template").content;
const cardTemplate = template.querySelector(".card");

//------------------functions of forms----------------------//

function modalClick(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

//---------------------------------------------------------//

//------------------EventListeners of forms----------------//

editBtnClick.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  modalClick(profileModalEdit);
});

addNewCardBtn.addEventListener("click", () => {
  modalClick(profileModalAdd);
});

editCloseBtn.addEventListener("click", () => {
  closePopup(profileModalEdit);
});

addCloseBtn.addEventListener("click", () => {
  closePopup(profileModalAdd);
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

//ADD submit function
function renderCard(data, warraper) {
  const cardElement = getCardElement(data);
  //adding the card after the others
  warraper.prepend(cardElement);
  //bring back inputs placeholders
  inputTitleAdd.value = inputTitleAdd.textContent;
  inputUrlAdd.value = inputUrlAdd.textContent;
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const name = inputTitleAdd.value;
  const link = inputUrlAdd.value;
  //sends the data
  renderCard({ name, link }, cardList);
  closePopup(profileModalAdd);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeActiveBtns = cardElement.querySelector(".card__like-button");
  const deleteImageBtn = cardElement.querySelector(".card__trash-button");

  //preview image with text and alt
  cardImage.addEventListener("click", () => {
    modalClick(profileModalImage);
    imagePreview.src = data.link;
    imagePreview.alt = data.name;
    titlePreview.textContent = data.name;
  });

  //close preview image
  imageCloseBtn.addEventListener("click", () => {
    closePopup(profileModalImage);
  });

  //remove card image
  deleteImageBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  //activate like button
  likeActiveBtns.addEventListener("click", () => {
    likeActiveBtns.classList.toggle("card__like-button_active");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data) => renderCard(data, cardList));
