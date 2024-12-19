import './styles/index.css';
import { createCard } from "./components/card.js";
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { getInitialCards, getProfInfo, PatchAvatarImg, PatchProfile, PostCards } from "./components/api.js";
import {
        InputName,
        InputUrl,
        popupClose,
        popupOpenprofile,
        popupOpennewcard,
        popupOpenavatar,
        profilePopup,
        cardPopup,
        imagePopup,
        avatarImagePopup,
        placesList,
        profileFormElement,
        nameInput,
        jobInput,
        profileTitle,
        profileDescr,
        profileAvFormElement,
        ProfileAvInput,
        overlays,
        NewCardElement,
        ButtonSubmProf,
        ButtonSubmCard,
        ButtonSubmAv,
    } from './components/const.js';

//плавное открытие и закрытие
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
avatarImagePopup.classList.add('popup_is-animated');


//заполнение анкеты профиля
function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescr.textContent;
}

//прослушивание popup редактирования профиля для открытия
popupOpenprofile.addEventListener('click', () => {
    openModal(profilePopup);
    fillProfileForm();
});

//открываем редактор фото
popupOpennewcard.addEventListener('click', () => {
    openModal(cardPopup);
});

//открытие попапа изменения аватарки
popupOpenavatar.addEventListener('click', () => {
    openModal(avatarImagePopup);
});


//прослушивание popup для закрытия
popupClose.forEach(button => {
    button.addEventListener('click', (evt) => {
      const popup = evt.target.closest('.popup');
      closeModal(popup);
    });
});


//сохранение данных профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    ButtonSubmProf.textContent = 'Сохранение...'
    PatchProfile(nameInput.value, jobInput.value)
        .then((data) => {
            profileTitle.textContent = data.name
            profileDescr.textContent = data.about
            closeModal(profilePopup)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            ButtonSubmProf.textContent = 'Сохранить'
        })

}


//заполнение новой карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    ButtonSubmCard.textContent = 'Создание...'

    PostCards(InputName.value, InputUrl.value)
        .then((data) => {
            const newCard = createCard(
                data.name, data.link, data._id, data.likes, data.owner._id, userId);
            placesList.prepend(newCard);
            evt.target.reset()
            closeModal(cardPopup)
            target.reset()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            ButtonSubmCard.textContent = 'Создать'
        })

};

//дефолтное фото профиля
import avatar from '../src/images/avatar.jpg';
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

//сохранение аватара профиля
function handleProfileAvatarFormSubmit(evt) {
    evt.preventDefault();

    ButtonSubmAv.textContent = 'Сохранение...'

    PatchAvatarImg(ProfileAvInput.value)
        .then((data) => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            evt.target.reset()
            closeModal(avatarImagePopup)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            ButtonSubmAv.textContent = 'Сохранить'
        })

}

//запуск слушателей
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
NewCardElement.addEventListener('submit', handleAddCardFormSubmit);
profileAvFormElement.addEventListener('submit', handleProfileAvatarFormSubmit);

//установка валидации
enableValidation();


//закрытие попапа на оверлей (ограничение - сама форма)
overlays.forEach(overlay => {
overlay.addEventListener('click', (event) => {
  if (!event.target.closest('.popup__content')) {
      closeModal(overlay);
  }
});
});


//без этого let новая карточка повялется только после обновления страницы, так как не знает кто добавил ее и не может заполнить данные
//поэтому изначально мой токен
let userId = 'de122cfe9c85b26026a7dc00';


//запуск получения информации с сервера
//data[0] из getProfInfo, а data[1] из getInitialCards
//сначала заполняем профиль по сохраненным данным на сервере, а потом проходимся по массиву карточек и создаем их
Promise.all([getProfInfo(), getInitialCards()])
    .then((data) => {
        const userId = data[0]._id;
        profileTitle.textContent = data[0].name
        profileDescr.textContent = data[0].about
        profileImage.style.backgroundImage = `url(${data[0].avatar})`
        data[1].forEach((item) => {
            placesList.append(createCard(item.name, item.link, item._id, item.likes, item.owner._id, userId))
        })
    })
