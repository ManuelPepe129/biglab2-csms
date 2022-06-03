'use strict'

//const dayjs = require ('dayjs');

function Film(id, title, favorite, watchdate, rating, user){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.watchdate = watchdate;
    this.rating = rating;
    this.user = user;
}

exports.Film = Film;