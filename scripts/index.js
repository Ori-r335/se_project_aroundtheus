const initialCards = [
  {
    name: "Yosemite Valley",
    link: "practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
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
  

