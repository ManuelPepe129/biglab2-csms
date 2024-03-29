import dayjs from 'dayjs';

const APIURL = new URL('http://localhost:3001/api/');  // Do not forget '/' at the end

async function getAllFilms() {
  // call: GET /api/films
  const response = await fetch(new URL('films', APIURL), { credentials: 'include' });
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
  const response = await fetch(new URL(filterURL, APIURL), { credentials: 'include' });
  const filmsJson = await response.json();

  if (response.ok) {
    return filmsJson.map((film) => ({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }));
  } else {
    throw filmsJson;  // an object with the error coming from the server
  }
}

async function addFilm(film) {
  return new Promise((resolve, reject) => {
    fetch(new URL('films', APIURL), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: film.id, title: film.title, favorite: film.favorite, watchdate: film.watchdate, rating: film.rating }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with server." }) });
  });
}
function deleteFilm(filmId) {

  return new Promise((resolve, reject) => {
    fetch(new URL('films/' + filmId, APIURL), {
      method: 'DELETE',
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateFilm(film) {
  // call: PUT /api/films/:Id
  return new Promise((resolve, reject) => {
    fetch(new URL('films/' + film.id, APIURL), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(film),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}
function updateFavorite(film) {
  // call: PUT /api/films/:Id
  if (film.favorite === false) {
    film.favorite = 0;
  }
  else { film.favorite = 1; }
  return new Promise((resolve, reject) => {
    fetch(new URL('films/' + film.id + '/' + film.favorite, APIURL), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function logIn(credentials) {
  let response = await fetch(new URL('sessions', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
}

async function getUserInfo() {
  const response = await fetch(new URL('sessions/current', APIURL), { credentials: 'include' });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}


const API = { getAllFilms, getFilmsByFilter, addFilm, deleteFilm, updateFilm, updateFavorite, logOut, logIn, getUserInfo };

export default API;