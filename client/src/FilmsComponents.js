import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import React from 'react';
import { Sidebar } from './SidebarComponents';
import './FilmsComponents.css';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from './API';


import dayjs from 'dayjs';

import ReactStars from 'react-stars'

function MainComponent(props) {
  const { filter } = useParams();

  function renderTable() {
    if (filter) {
      switch (filter) {
        case '':
        case 'All':
        case 'Favorites':
        case 'Best Rated':
        case 'Seen Last Month':
        case 'Unseen':
          return <FilmTable filter={filter} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />;
        default:
          return <h1>Filter not found</h1>;
      }
    } else {
      return <FilmTable filter={filter} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />;
    }
  }

  return (
    <Row>
      <Col xs={3} className={'sideBar'}>
        <Sidebar updateFilter={props.updateFilter} />
      </Col>
      <Col xs={8}>
        {renderTable()}
      </Col>
    </Row>
  );

}

function FilmTable(props) {
  const [films, setFilms] = useState([]);

  /*
  useEffect(() => {
    API.getAllFilms()
      .then((films) => { setFilms(films) })
      .catch(err => console.log(err));
  }, []);
  */

  
  useEffect(() => {
    API.getFilmsByFilter(props.filter)
    .then((films) => { setFilms(films) })
      .catch(err => console.log(err));
    }, [props.filter]);


  const navigate = useNavigate();

  return (
    <>
      <h1 className='fs-1'>{props.filter ? props.filter : 'All'}</h1>
      <Table>
        <tbody>
          {
            films.map((film) => <FilmRow film={film} key={film.id} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />)
          }
        </tbody>
      </Table>
      <button type="button" className=" btn-lg btn-primary fixedButton rounded-circle" onClick={() => navigate('/add')}>+</button>
    </>
  )
}

function FilmRow(props) {
  return (
    <tr>
      <FilmData film={props.film} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />
    </tr>
  )
}

function FilmData(props) {
  const navigate = useNavigate();

  const ratingChanged = (newRating) => {
    const newFilm = { id: props.film.id, title: props.film.title, favorite: props.film.favorite, watchdate: props.film.watchdate, rating: newRating };
    props.updateFilm(newFilm);
  }

  const toggleFavourite = (event) => {
    const newFilm = { id: props.film.id, title: props.film.title, favorite: event.target.checked, watchdate: props.film.watchdate, rating: props.film.rating };
    props.updateFilm(newFilm);
  }

  return (
    <>
      <td className={`favorite text-start col-4 ${(props.film.favorite) ? "red" : false}`}>
        {props.film.title}
      </td>
      <td>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check inline type="checkbox" label="Favorite" defaultChecked={props.film.favorite}
            onChange={(event) => {
              toggleFavourite(event);
            }} />
        </Form.Group>
      </td>
      <td>
        {(dayjs(props.film.watchdate).isValid()) ? dayjs(props.film.watchdate).format('YYYY-MM-DD') : ""}
      </td>
      <td>
        <ReactStars
          value={props.film.rating}
          count={5}
          edit={true}
          half={false}
          onChange={ratingChanged}
          size={24}
          color2={'#ffd700'} />
      </td>


      <td><Button variant='light' className='edit'
        onClick={() => navigate(`/edit/${props.film.id}`)}
      ><Pencil></Pencil></Button></td>

      <td><Button variant='light' className='delete'
        onClick={() => { props.deleteFilm(props.film.id) }}
      ><Trash></Trash></Button></td>


    </>
  );
}

export { MainComponent };