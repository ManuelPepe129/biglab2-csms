'use strict'

const { response } = require('express');
const dayjs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');
const {check, validationResult} = require('express-validator'); // validation middleware


const PORT = 3001;

const app = new express();

app.use(morgan('dev'));
app.use(express.json());

/** APIs **/

//GETALL /api/films
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


// FILTER GETFAVORITES /api/favorites
app.get('/api/favorites', async (request, response) => {
    try {

        const result =  await dao.listFavorite();

        if(result.error)
          response.status(404).json(result);
        else 
        response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});

// FILTER BESTRATED /api/bestrated
app.get('/api/bestRated', async (request, response) => {
    try {

        const result =  await dao.listBestRated();

        if(result.error)
          response.status(404).json(result);
        else 
        response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});

// FILTER SEENLASTMONTH /api/seenLastMonth
app.get('/api/seenLastMonth', async (request, response) => {
    try {

        const result =  await dao.listSeenLastMonth();

        if(result.error)
          response.status(404).json(result);
        else 
        response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});

// FILTER UNSEEN /api/unseen
app.get('/api/unseen', async (request, response) => {
    try {

        const result =  await dao.listUnseen();

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
app.post('/api/films',[
    check('favorite').isInt({min: 0, max: 1}),
    check('rating').isInt({min: 0, max: 5}),
    check('watchdate').isBefore(dayjs().format('YYYY-MM-DD')),
  ],  async(request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(422).json({errors: errors.array()});
    } 
    
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

/*

REQBIN TEST:

 {"title":"changed",
 "favorite":"1",
 "watchdate":"2022-03-20",
 "rating":"4"
} */

//UPDATE /api/films/:id
app.put('/api/films/:id',  [
    check('favorite').isInt({min: 0, max: 1}),
    check('rating').isInt({min: 0, max: 5}),
    check('watchdate').isBefore(dayjs().format('YYYY-MM-DD')),
  ], async(request, response)=>{

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(422).json({errors: errors.array()});
    } 

    const film ={
        id: request.params.id,
        title: request.body.title,
        favorite: request.body.favorite,
        watchdate: request.body.watchdate,
        rating: request.body.rating,
    }; 

    

    try{
        await dao.updateFilm(film);
        response.status(200).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the update of film ${request.params.id}.` });
    }
});

//UPDATEFILMFAVORITE /api/films/:id/:favorite
app.put('/api/films/:id/:favorite', [
    check('favorite').isInt({min: 0, max: 1})
], async(request, response)=>{
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(422).json({errors: errors.array()});
    } 
    try{
        await dao.updateFilmFavorite(request.params.id, request.params.favorite);
        response.status(200).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the update of film ${request.params.id}.` });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));