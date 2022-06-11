import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Col, Alert, Row } from 'react-bootstrap';
import { MyNavbar } from './NavbarComponents';
import { MainComponent } from './FilmsComponents';
import { useParams, BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { FilmFormWrapper } from './FilmForm';
import { LoginForm, LogoutButton } from './LoginComponents';
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
  return (
    <Router>
      <App2 />
    </Router>
  )
}

function App2() {
  const [filter, setFilter] = useState('');
  const [films, setFilms] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);  // no user is logged in when app loads
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  function handleError(err) {
    console.log(err);
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch (err) {
        handleError(err);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      API.getFilmsByFilter(filter)
        .then((films) => { setFilms(films); setDirty(false); })
        .catch(err => handleError(err));
    }
  }, [loggedIn, filter])


  useEffect(() => {
    if (dirty) {
      API.getFilmsByFilter(filter)
        .then((films) => { setFilms(films); setDirty(false); })
        .catch(err => console.log(err));
    }
  }, [dirty]);

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then(user => {
        setLoggedIn(true);
        setUser(user);
        setMessage('');
        navigate('/');
      })
      .catch(err => {
        setMessage(err);
      }
      )
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setFilter('');
    setUser({});
    setFilms([]);
    navigate('/login');
  }


  function addFilm(film) {
    setFilms(oldFilms => [...oldFilms, film]);
    film.status = 'added';
    API.addFilm(film)
      .then(() => setTimeout(()=>setDirty(true),1000))
      .catch((err) => console.log(err));
  }

  function deleteFilm(filmId) {
    setFilms(f => f.map(fi => (fi.id === filmId) ? { ...fi, status: 'deleted' } : fi));
    API.deleteFilm(filmId)
      .then(() => setTimeout(()=>setDirty(true),1000))
      .catch(err => console.log(err));
  }

  function updateFilm(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({ status: 'edited' }, film) : f
    ));
    API.updateFilm(film)
      .then(() => setTimeout(()=>setDirty(true),1000))
      .catch(err => console.log(err));
  }

  function updateFilmFavorite(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({ status: 'edited' }, film) : f
    ));
    API.updateFavorite(film)
      .then(() => setDirty(true))
      .catch(err => console.log(err));
  }

  return (
    <>
      <MyNavbar></MyNavbar>
      <Container>
        <Row><Col>
          {loggedIn ? <LogoutButton logout={doLogOut} user={user} /> : false}
        </Col></Row>
        <Row><Col>
          {message ? <Alert variant='danger' onClose={() => setMessage('')} dismissible>{message}</Alert> : false}
        </Col></Row>
      </Container>
      <Container fluid className="mh-100">
        <Routes>
          <Route path='/' element=
            {loggedIn ?
              <MainComponent films={films} filter={filter} deleteFilm={deleteFilm} setFilter={setFilter} updateFilm={updateFilm} updateFavorite={updateFilmFavorite} />
              : <Navigate to={'/login'} />
            } ></Route>
          <Route path='/add' element={<FilmFormWrapper films={films} addFilm={addFilm} />}></Route>
          <Route path='/edit/:filmId' element={<FilmFormWrapper films={films} addFilm={updateFilm} />}></Route>
          <Route path='/login' element={loggedIn ? <Navigate to='/' /> : <LoginForm login={doLogIn} updateMessage={setMessage}/>}> </Route>
          <Route path='*' element={<h1>Page not found</h1>}> </Route>
          <Route path='/filter/:filter' element={loggedIn ?
            <MainComponent films={films} filter={filter} deleteFilm={deleteFilm} setFilter={setFilter} updateFilm={updateFilm} updateFavorite={updateFilmFavorite} />
            : <Navigate to='/login' />}> </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
