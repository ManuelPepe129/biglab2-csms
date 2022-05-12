'use strict'

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

const PORT = 3001;

const app = new express();

app.use(morgan('dev'));
app.use(express.json());

/** APIs **/

//GET /api/films
app.get('/api/films', (request, response) =>{
    dao.listFilms()
    .then(films => response.json(films))
    .catch(()=>response.status(500).end());
});




app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));