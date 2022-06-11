'use strict'

const sqlite = require('sqlite3');
const { Film } = require('./film');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

//get all films
exports.listFilms = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE user=?";
        db.all(sql, [user], (err, rows) => {
            if (err)
                reject(err);
            else {
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    })
}

//get film by id
exports.listFilmByID = (id,user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE id = ? AND user=?";
        db.get(sql, [id, user], (err, row) => { 
            if (err)
                reject(err);

            if(row == undefined){
                resolve({error: 'Film not found'});
            }
            else {
                const film =  new Film(row.id, row.title, row.favorite, row.watchdate, row.rating);
                resolve(film);
            }
        });
    })
}


//get favorites
exports.listFavorite = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE favorite = 1 AND user=?" ;
        db.all(sql, [user], (err, rows) => {
            if (err)
                reject(err);
            else {
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    })
}

//get bestRated
exports.listBestRated = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE rating = 5 AND user=?" ;
        db.all(sql, [user], (err, rows) => {
            if (err)
                reject(err);
            else {
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    })
}

//seenLastMonth
exports.listSeenLastMonth = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE julianday(DATE('now'))- julianday(watchdate) < 30 AND user=?" ;
        db.all(sql, [user], (err, rows) => {
            if (err)
                reject(err);
            else {
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    })
}

//get unseen
exports.listUnseen = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE watchdate is NULL AND user=?" ;
        db.all(sql, [user], (err, rows) => {
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
        const sql = "INSERT INTO films(title, favorite, watchdate, rating, user) values (?,?,?,?,?)";
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.user], function (err) {
            if (err){ reject(err);
                return;

            }else resolve(this.id);
            
        })
    });
}

//update film
exports.updateFilm = (film, user) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=? AND user=?";
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.id, user], function (err) {
            if (err){ reject(err);
                return;

            }
             resolve(this.id);
        })
    });
}

//update film mark
exports.updateFilmFavorite = (id, favorite, user) => {
    
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET  favorite=? WHERE id=? AND user=?";
        db.run(sql, [ favorite, id, user], function (err) {
            if (err){ reject(err);
                return;

            }
             resolve(this.id);
        })
    });
}

//delete film
exports.deleteFilm = (id, user) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM films WHERE id=? AND user=?";
        db.run(sql, [id, user], function (err) {
            if (err) reject(err);
            else resolve(null);
        })
    });
}