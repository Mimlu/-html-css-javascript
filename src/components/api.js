const config = {
    baseUrl: "https://nomoreparties.co/v1/frontend-st-cohort-201",
    headers: {
        authorization: "10195cda-9805-4374-8371-aab88f730645",
        "Content-Type": "application/json",
    },
};

//проверка на ответ
function checkRes(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//выгрузка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
        .then(checkRes)
};


//выгрузка информации профиля
export const getProfInfo  = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: {
            authorization: config.headers.authorization,
        },
    })
        .then(checkRes)

};


//обновление информации профиля
export const PatchProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    })
        .then(checkRes);
}

//создание карточек
export const PostCards = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkRes)
}

//обновление аватарки профиля
export const PatchAvatarImg = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
           avatar: link
        })
    })
        .then(checkRes)
}

//поставить лайк
export const PutLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkRes)
}

//убрать лайк
export const DeleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkRes)
}

//убрать карточку
export const DeleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkRes)
}