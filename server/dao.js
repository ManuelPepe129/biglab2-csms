'use strict'

const sqlite = require('sqlite3');
const { Film } = require('./film');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

//get all films
exports.listFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    })
}

//add new film
exports.addFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO films(title, favorite, watchdate, rating) values (?,?,?,?)";
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating], function (err) {
            if (err) reject(err);
            else resolve(this.id);
        })
    });
}

//update film
exports.updateFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE film SET title=?, favorite=?, watchdate=?, rating=? WHERE id=?";
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.id], function (err) {
            if (err) reject(err);
            else resolve(this.id);
        })
    });
}

//delete film
exports.deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM films WHERE id=?";
        db.run(sql, [id], function (err) {
            if (err) reject(err);
            else resolve(null);
        })
    });
}