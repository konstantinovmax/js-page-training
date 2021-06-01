/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const promoAdv = document.querySelectorAll('.promo__adv img');
const filmGenre = document.querySelector('.promo__genre');
const promoBackground = document.querySelector('.promo__bg');
const filmItems = document.querySelector('.promo__interactive-list');
const form = document.querySelector('.add');
const formInput = form.querySelector('.adding__input');
const submitButton = form.querySelector('.submit-button');

function deleteAdv(promos) {
    promos.forEach((item) => {
        item.remove();
    });
}

function makeChanges() {
    filmGenre.textContent = 'драма';
    promoBackground.style.cssText = 'background: url(../img/bg.jpg) center center/cover no-repeat';
}

function sortArr(arr) {
    arr.sort();
}

function renderMovie(films, parent) {
    parent.innerHTML = '';

    films.forEach((item, i) => {
        parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${item}
                <div class="delete"></div>
            </li>
        `;
    });

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
            movieDB.movies.splice(i, 1);
            renderMovie(films, parent);
            sortArr(movieDB.movies);
        });
    });
}

function submitFormHandler(evt) {
    evt.preventDefault();

    let newFilm = formInput.value;

    if (newFilm) {
        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        }

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        renderMovie(movieDB.movies, filmItems);
    }
    
    evt.target.reset();
}

deleteAdv(promoAdv);
makeChanges();
sortArr(movieDB.movies);
renderMovie(movieDB.movies, filmItems);
form.addEventListener('submit', submitFormHandler);
