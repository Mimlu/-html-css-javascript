import { template } from "..";

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

export {createCard}