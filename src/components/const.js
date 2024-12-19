const page = document.querySelector('.page__content');
const content = document.querySelector('.profile');

const popupClose = page.querySelectorAll('.popup__close');
const popupOpenprofile = content.querySelector('.profile__edit-button');
const popupOpennewcard = content.querySelector('.profile__add-button');
const popupOpenavatar = content.querySelector('.profile-avatar__edit-button');

const profilePopup = page.querySelector('.popup_type_edit');
const cardPopup = page.querySelector('.popup_type_new-card');
const imagePopup = page.querySelector('.popup_type_image');
const avatarImagePopup = page.querySelector('.popup_type_imgavatar');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const template = document.querySelector('#card-template').content;

const cardElement = template.cloneNode(true);
const cardImage = cardElement.querySelector('.card__image');
const cardTitle = cardElement.querySelector('.card__title');

const placesList = document.querySelector('.places__list');

const profileFormElement = page.querySelector('.popup__form[name="edit-profile"]');
const NewCardElement = page.querySelector('.popup__form[name="new-place"]');

const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_description');

const profileTitle = content.querySelector('.profile__title');
const profileDescr = content.querySelector('.profile__description');

const newPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newPopup.querySelector('.popup__form');

const inputCardName = newCardForm.querySelector('input[name="place-name"]');
const inputCardUrl = newCardForm.querySelector('input[name="link"]');

const profileAvFormElement = page.querySelector('.popup__form[name="img-avatar"]');

const ProfileAvInput = page.querySelector('#avatar-url-input');
const profAvatar = content.querySelector('.profile__image');

const overlays = document.querySelectorAll('.popup');

const ButtonSubmProf = document.querySelector('#button-save');
const ButtonSubmCard = document.querySelector('#button-crate');
const ButtonSubmAv = document.querySelector('#button-save-av');

const InputName = document.querySelector('#card-name-input');
const InputUrl = document.querySelector('#card-url-input');

export {page,
        InputName,
        InputUrl,
        ButtonSubmProf,
        ButtonSubmCard,
        ButtonSubmAv,
        content,
        popupClose,
        popupOpenprofile,
        popupOpennewcard,
        popupOpenavatar,
        profilePopup,
        cardPopup,
        imagePopup,
        avatarImagePopup,
        popupImage,
        popupCaption,
        template,
        cardElement,
        cardImage,
        cardTitle,
        placesList,
        profileFormElement,
        nameInput,
        jobInput,
        profileTitle,
        profileDescr,
        newPopup,
        newCardForm,
        inputCardName,
        inputCardUrl,
        profileAvFormElement,
        ProfileAvInput,
        profAvatar,
        overlays,
        NewCardElement
    }