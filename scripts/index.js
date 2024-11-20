// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const page = document.querySelector('.page__content');
const content = document.querySelector('.profile');

const popupClose = page.querySelectorAll('.popup__close');
const popupOpenprofile = content.querySelector('.profile__edit-button');
const popupOpennewcard = content.querySelector('.profile__add-button');

const profilePopup = page.querySelector('.popup_type_edit');
const cardPopup = page.querySelector('.popup_type_new-card');
const imagePopup = page.querySelector('.popup_type_image');

const template = document.querySelector('#card-template').content;


// Функция создания разметки
function createCard() {
    console.log('типо создалась фотка ну база')
    return template.cloneNode(true);
  }

//Функция заполнения карточки данными
function fillCard(cardEl, data) {
    const cardImage = cardEl.querySelector('.card__image');
    const cardTitle = cardEl.querySelector('.card__title');

    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    console.log('типо даже заполнилост')

    return data

  }


// Функция показа карточек на экране
function showCards() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach(cardData => {
      const card = createCard();
      fillCard(card, cardData);
      placesList.append(card);
    });
    console.log('типо должна показываться')
  }

window.addEventListener('DOMContentLoaded', showCards);

//функция открытия
function openModal(popup) {
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
    console.log('открыло')
    openModal(cardPopup);
});


const inputCardName = page.querySelector('.popup__input_type_card-name');
const inputCardUrl = page.querySelector('.popup__input_type_url');


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: inputCardName.value,
        link: inputCardUrl.value,
    };

    initialCards.unshift(newCard);

    closeModal(cardPopup);

    inputCardName.value = '';
    inputCardUrl.value = '';
}

profileFormElement.addEventListener('submit', handleCardFormSubmit);
