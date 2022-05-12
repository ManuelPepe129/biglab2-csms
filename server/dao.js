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

//get film by id
exports.listFilmByID = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE id = ?";
        db.get(sql, [id], (err, row) => { 
            console.log(id)
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
exports.listFavorite = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE favorite = 1" ;
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

//get bestRated
exports.listBestRated = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE rating = 5" ;
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

//seenLastMonth
exports.listSeenLastMonth = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE datediff(now(), watchdate)< 30" ;
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

//get unseen
exports.listUnseen = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FILMS WHERE watchdate is NULL" ;
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
        const sql = "INSERT INTO films(title, favorite, watchdate, rating, user) values (?,?,?,?,?)";
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.user], function (err) {
            if (err){ reject(err);
                return;

            }else resolve(this.id);
            
        })
    });
}

//update film
exports.updateFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=?";
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.id], function (err) {
            if (err){ reject(err);
                return;

            }
             resolve(this.id);
        })
    });
}

//update film mark
exports.updateFilmFavorite = (id, favorite) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET  favorite=? WHERE id=?";
        db.run(sql, [ favorite, id], function (err) {
            if (err){ reject(err);
                return;

            }
             resolve(this.id);
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