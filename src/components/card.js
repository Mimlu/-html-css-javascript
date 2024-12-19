import {popupImage, popupCaption, template, imagePopup} from "./const.js"
import {openModal} from "./modal.js";
import {PutLike, DeleteLike, DeleteCard} from "./api.js";

//количество лайков
const likeCount = (cardLikeCount, likes) => {
    cardLikeCount.textContent = likes.length
}

//активная или нет кнопка лайка
const toggleLike = (evt) => {
    evt.classList.toggle('card__like-button_is-active');
}

//для удаления карточки
function closeItem(evt) {
    evt.target.closest('.card').remove()
}


function createCard(name, link, id, likes, ownerId, userId) {
    const cardElement = template.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    const cardLikeCount = cardElement.querySelector('.card__button-like-count');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    //присваивание значений карточки
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    cardLikeCount.textContent = likes.length;

    //попап при нажатии на карточку
    cardImage.addEventListener('click', function () {
        popupCaption.textContent = name;
        popupImage.alt = name;
        popupImage.src = link;
        openModal(imagePopup);
    });

    //если пользователь нажал на лайк меняем кнопку
    likes.some(card => {
        if (userId === card._id) {
            likeButton.classList.add("card__like-button_is-active")
        }
    });

    //если уже есть лайк и нажимают, то по id удаляем лайк
    //обновляем количество лайков
    //если нет лайка и нажимают, то по id добавляем лайк
    //обновляем количество лайков
    likeButton.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like-button_is-active')) {
            DeleteLike(id)
                .then(data => {
                    toggleLike(likeButton)
                    likeCount(cardLikeCount, data.likes)
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            PutLike(id)
                .then(data => {
                    toggleLike(likeButton)
                    likeCount(cardLikeCount, data.likes)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    //если пользователь удаляет свою карточку, то удаляем ее
    //пользователю не даем возможность удалять не свои карточки
    if (userId === ownerId) {
        deleteButton.addEventListener('click', (evt) => {
            DeleteCard(id)
                .then(() => {
                    closeItem(evt)
                })
                .catch((err) => {
                    console.log(err)
                });
        })
    }
    else
        {
            deleteButton.remove()
        }


return cardElement
}

export {createCard};