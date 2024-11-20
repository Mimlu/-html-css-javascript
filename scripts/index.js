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


// Функция создания разметки
function createCard() {
    const cardElement = template.cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    deleteButton.addEventListener('click', (event) => {
        const cardItem = event.target.closest('.card'); // Ищем родительский элемент карточки
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
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
}

//функция закрытия любого popup
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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


const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');

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

    closeModal(newCardPopup);

    inputCardName.value = '';
    inputCardUrl.value = '';
});
