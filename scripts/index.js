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

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');


// Функция создания разметки
function createCard() {
    const cardElement = template.cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    deleteButton.addEventListener('click', (event) => {
        const cardItem = event.target.closest('.card');
        if (cardItem) {
            cardItem.remove();
        }
    });

    return cardElement
  }

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


//функция открытия
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

//функция закрытия любого popup
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}


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

//валидация форм
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };


const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

//установка проверки всех полей в форме
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
          });
    });
  };

//установка проверки всех форм на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
      });
  };

  //проверка на заполнение всей формы
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
       return !inputElement.validity.valid;
    })
  };

  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)){
      buttonElement.classList.add('button_inactive');
    } else {
      buttonElement.classList.remove('button_inactive');
    }
  }

  enableValidation();

//закрытие попапа на оверлей (ограничение - сама форма)
const overlays = document.querySelectorAll('.popup');
const dontTouches = document.querySelectorAll('.popup__content');

overlays.forEach(overlay => {
  overlay.addEventListener('click', (event) => {
    if (!event.target.closest('.popup__content')) {
        closeModal(overlay);
    }
  });
});


//закрытие попапа на esc
function closeByEsc(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  }