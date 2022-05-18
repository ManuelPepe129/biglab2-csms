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

async function getFavoriteFilms() {
    const response = await fetch(new URL('favorites', APIURL));
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
    } else {
        throw filmsJson;  // an object with the error coming from the server
    }
}

async function getBestRatedFilms() {
    const response = await fetch(new URL('bestRated', APIURL));
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
    } else {
        throw filmsJson;  // an object with the error coming from the server
    }
}

async function getUnseenFilms() {
    const response = await fetch(new URL('unseen', APIURL));
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
    } else {
        throw filmsJson;  // an object with the error coming from the server
    }
}

async function getSeenLastMonth() {
    const response = await fetch(new URL('seenLastMonth', APIURL));
    const filmsJson = await response.json();
    if (response.ok) {
        return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
    } else {
        throw filmsJson;  // an object with the error coming from the server
    }
}

const API = { getAllFilms, getFavoriteFilms, getBestRatedFilms, getUnseenFilms, getSeenLastMonth };
export default API;