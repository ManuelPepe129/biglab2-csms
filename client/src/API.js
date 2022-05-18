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

const API = {getAllFilms};
export default API;