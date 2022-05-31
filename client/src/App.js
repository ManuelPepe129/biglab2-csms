import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { MyNavbar } from './NavbarComponents';
import { MainComponent } from './FilmsComponents';
import { useParams, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilmFormWrapper } from './FilmForm';
import { useState, useEffect } from 'react';
import API from './API';

/*
const filmList = [
  { id: 1, title: "Pulp Fiction", isFavourite: true, date: '2022-03-10', rating: 5 },
  { id: 2, title: "21 Grams", isFavourite: true, date: '2022-04-17', rating: 5 },
  { id: 3, title: "Star Wars", isFavourite: false, date: '', rating: 0 },
  { id: 4, title: "Matrix", isFavourite: false, date: '', rating: 0 },
  { id: 5, title: "Shrek", isFavourite: false, date: '2021-11-21', rating: 3 }
]
*/

function App() {

  const [filter, setFilter] = useState('');
  const [films, setFilms] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    API.getFilmsByFilter(filter)
      .then((films) => { setFilms(films) })
      .catch(err => console.log(err));
  }, [filter]);

  useEffect(() => {
    if (films.length && dirty) {
      API.getFilmsByFilter(filter)
        .then((films) => { setFilms(films); setDirty(false); })
        .catch(err => console.log(err));
    }
  }, [films.length, dirty]);

  function addFilm(film) {
    setFilms(oldFilms => [...oldFilms, film]);
    film.status = 'added';
    API.addFilm(film)
      .then(() => setDirty(true))
      .catch((err) => console.log(err));
  }

  function deleteFilm(filmId) {
    setFilms(f => f.map(fi => (fi.id === filmId) ? { ...fi, status: 'deleted' } : fi));
    API.deleteFilm(filmId)
      .then(() => setDirty(true))
      .catch(err => console.log(err));
  }

  function updateFilm(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({status: 'edited'}, film) : f
    ));
    API.updateFilm(film)
      .then(() => setDirty(true))
      .catch(err => console.log(err));
  }

  function updateFilmFavorite(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({status: 'edited'}, film) : f
    ));
    API.updateFavorite(film)
      .then(() => setDirty(true))
      .catch(err => console.log(err));
  }

  return (
    <>
      <MyNavbar></MyNavbar>
      <Container fluid className="mh-100">
        <Router>
          <Routes>
            <Route path='/' element={<MainComponent films={films} filter={filter} deleteFilm={deleteFilm} setF={setFilter} updateFilm={updateFilm} updateFavorite={updateFilmFavorite} />}  ></Route>
            <Route path='/add' element={<FilmFormWrapper films={films} addFilm={addFilm} />}></Route>
            <Route path='/edit/:filmId' element={<FilmFormWrapper films={films} addFilm={updateFilm} />}></Route>
            <Route path='*' element={<h1>Page not found</h1>}> </Route>
            <Route path='/filter/:filter' element={<MainComponent films={films} filter={filter} deleteFilm={deleteFilm} setF={setFilter} updateFilm={updateFilm} updateFavorite={updateFilmFavorite} />}> </Route>
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
