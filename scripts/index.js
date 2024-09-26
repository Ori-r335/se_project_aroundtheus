const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const editBtnClick = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const editCloseBtn = profileEditModal.querySelector(".modal__close-button");
const profileSection =document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__title');
const profileSubtitle = profileSection.querySelector('.profile__subtitle');
const inputName = profileEditModal.querySelector('#name');
const inputSubtitle = profileEditModal.querySelector('#subtitle');
const profileFormSubmit = profileEditModal.querySelector('.modal__form');
const cardList = document.querySelector(".cards__list");
const Template = document.querySelector("#card-template").content;
const cardTemplate = Template.querySelector(".card");



editBtnClick.addEventListener("click", editClick);
function editClick() {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closePopup(){
  profileEditModal.classList.remove("modal_opened");
}

editCloseBtn.addEventListener("click", editClickClose);
function editClickClose() {
  closePopup()
}


profileFormSubmit.addEventListener('submit', handleFormSubmit);
 function handleFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = inputName.value;
   profileSubtitle.textContent = inputSubtitle.value;
   closePopup()
  }
  

function getCardElement (data){
   
  const cardElement = cardTemplate.cloneNode(true);  
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  
  cardImage.src = data.link;  
  cardImage.alt = "Profile added image ";
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data)=>{
    const cardElement = getCardElement(data);
    cardList.append(cardElement);
});

