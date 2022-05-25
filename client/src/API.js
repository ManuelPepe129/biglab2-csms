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
    if (!filter) {
        try {
            return await getAllFilms();
        } catch (error) {
            console.error(error);
        }
    }

    const filterURL = filter.replace(/\s/g, '').toLowerCase();
    const response = await fetch(new URL(filterURL, APIURL));
    const filmsJson = await response.json();

    if (response.ok) {
        return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
    } else {
        throw filmsJson;  // an object with the error coming from the server
    }
}

async function addFilm(film){
    return new Promise((resolve, reject)=>{
        fetch(new URL('films', APIURL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating}),
        }).then((response)=>{
            if(response.ok){
                resolve(null);
            } else {
                response.json()
                .then((message)=>{reject(message);})
                .catch(()=> {reject({error:"Cannot parse server response."})});
            }
        }).catch(()=> {reject({error:"Cannot communicate with server."})});
    });
}


const API = { getAllFilms, getFilmsByFilter, addFilm};

export default API;