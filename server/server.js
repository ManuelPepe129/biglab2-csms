'use strict'

const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

const PORT = 3001;

const app = new express();

app.use(morgan('dev'));
app.use(express.json());

/** APIs **/

//GET /api/films
app.get('/api/films', (request, response) => {
    dao.listFilms()
        .then(films => response.json(films))
        .catch(() => response.status(500).end());
});



//GETFILMBYID /api/films/:id
app.get('/api/films/:id', async (request, response) => {
    try {

        const result =  await dao.listFilmByID(request.params.id);

        if(result.error)
          response.status(404).json(result);
        else 
        response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});



//DELETE /api/films/:id
app.delete('/api/films/:id', async (request, response) => {
    try {
        await dao.deleteFilm(request.params.id);
        response.status(204).end();
    } catch (err) {
        response.status(503).json({ error: `Database error during the deletion of film ${request.params.id}.` });
    }
});

//ADD /api/films
app.post('/api/films',  async(request, response) => {
    const film ={
        title: request.body.title,
        favorite: request.body.favorite,
        watchdate: request.body.watchdate,
        rating: request.body.rating,
        user: 0,
    };

    try{
        await dao.addFilm(film);
        response.status(201).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the creation of film ${film.title}.` });
    }
});

//UPDATE /api/films/:id
app.put('/api/films/:id',  async(request, response)=>{
    const film ={
        id: request.params.id,
        title: request.body.title,
        favorite: request.body.favorite,
        watchdate: request.body.watchdate,
        rating: request.body.rating,
    }; 

    console.log(film);

    try{
        await dao.updateFilm(film);
        response.status(200).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the update of film ${request.params.id}.` });
    }
});

//UPDATEFILMFAVORITE /api/films/:id&:favorite
app.put('/api/films/:id&:favorite',  async(request, response)=>{
    try{
        await dao.updateFilmFavorite(request.params.id, request.params.favorite);
        response.status(200).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the update of film ${request.params.id}.` });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));