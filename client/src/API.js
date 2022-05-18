import dayjs from 'dayjs';

const APIURL = new URL('http://localhost:3001/api/');  // Do not forget '/' at the end

async function getAllFilms() {
    // call: GET /api/courses
    const response = await fetch(new URL('films', APIURL));
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
    } else {
        throw filmsJson;  // an object with the error coming from the server
    }
}

async function getFilmsByFilter(filter) {
    const filterURL = filter.replace(/\s/g, '').toLowerCase();
    if (filterURL === "all" || !filterURL) {
        getAllFilms();
    } else {
        const response = await fetch(new URL(filterURL, APIURL));
        const filmsJson = await response.json();
        if (response.ok) {
            return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
        } else {
            throw filmsJson;  // an object with the error coming from the server
        }
    }
}

const API = { getAllFilms, getFilmsByFilter };

export default API;