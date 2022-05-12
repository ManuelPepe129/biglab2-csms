'use strict'

//const dayjs = require ('dayjs');

function Film(id, title, favorite, watchdate, rating){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.watchdate = watchdate;
    this.rating = rating;
}

exports.Film = Film;