import './styles/index.css';
import { initialCards  } from './cards.js';
import { createCard } from "./components/card.js";
import { openModal, closeModal, closeByEsc } from './components/modal.js';
import { enableValidation } from './components/validate.js'

const page = document.querySelector('.page__content');
const content = document.querySelector('.profile');

const popupClose = page.querySelectorAll('.popup__close');
const popupOpenprofile = content.querySelector('.profile__edit-button');
const popupOpennewcard = content.querySelector('.profile__add-button');

const profilePopup = page.querySelector('.popup_type_edit');
const cardPopup = page.querySelector('.popup_type_new-card');
const imagePopup = page.querySelector('.popup_type_image');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const template = document.querySelector('#card-template').content;
export {template}

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

//Функция заполнения карточки данными
function fillCard(cardElement, data) {
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardImage.addEventListener('click', () => {
        popupImage.src = data.link;
        popupImage.alt = data.name;
        popupCaption.textContent = data.name;
        openModal(imagePopup);
    });

    return data

  }


// Функция показа карточек на экране
function showCards() {
    const placesList = document.querySelector('.places__list');
    if (placesList.children.length === 0) {
        initialCards.forEach(cardData => {
          const card = createCard();
          fillCard(card, cardData);
          placesList.appendChild(card);
        });
    }
}

window.addEventListener('DOMContentLoaded', showCards);


//прослушивание popup редактирования профиля для открытия
popupOpenprofile.addEventListener('click', () => {
    openModal(profilePopup);
    fillProfileForm();
});


//прослушивание popup для закрытия
popupClose.forEach(button => {
    button.addEventListener('click', (evt) => {
      const popup = evt.target.closest('.popup');
      closeModal(popup);
    });
});



//заполнение анкеты профиля
function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescr.textContent;

}


const profileFormElement = page.querySelector('.popup__form[name="edit-profile"]');

const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_description');

const profileTitle = content.querySelector('.profile__title');
const profileDescr = content.querySelector('.profile__description');


//сохранение данных профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    profileTitle.textContent = newName;
    profileDescr.textContent = newJob;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);



//открываем редактор фото
popupOpennewcard.addEventListener('click', () => {
    openModal(cardPopup);
});


const newPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newPopup.querySelector('.popup__form');

//заполнение новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputCardName = newCardForm.querySelector('input[name="place-name"]').value;
    const inputCardUrl = newCardForm.querySelector('input[name="link"]').value;

    const newCard = {
        name: inputCardName,
        link: inputCardUrl
    };

    initialCards.push(newCard);

    const card = createCard();
    fillCard(card, newCard);
    const placesList = document.querySelector('.places__list');
    placesList.prepend(card);

    closeModal(cardPopup);

    newCardForm.reset();
});


enableValidation();


//закрытие попапа на оверлей (ограничение - сама форма)
const overlays = document.querySelectorAll('.popup');

overlays.forEach(overlay => {
overlay.addEventListener('click', (event) => {
  if (!event.target.closest('.popup__content')) {
      closeModal(overlay);
  }
});
});


//не отоюражается фото профиля, поэтому выражаю его через константу в js
import avatar from '../src/images/avatar.jpg'; 

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;