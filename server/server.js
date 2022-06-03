'use strict'

const { response } = require('express');
const dayjs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');
const cors = require('cors');
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the users in the DB

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
    function (username, password, done) {
        userDao.getUser(username, password).then((user) => {
            if (!user)
                return done(null, false, { message: 'Incorrect username and/or password.' });

            return done(null, user);
        })
    }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
    userDao.getUserById(id)
        .then(user => {
            done(null, user); // this will be available in req.user
        }).catch(err => {
            done(err, null);
        });
});


const PORT = 3001;
const app = new express();

app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    return res.status(401).json({ error: 'not authenticated' });
}

// set up the session
app.use(session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

/** APIs **/

//GETALL /api/films
app.get('/api/films', isLoggedIn, (request, response) => {
    dao.listFilms(request.user.id)
        .then(films => response.json(films))
        .catch(() => response.status(500).end());
});



//GETFILMBYID /api/films/:id
app.get('/api/films/:id', isLoggedIn, async (request, response) => {
    try {

        const result = await dao.listFilmByID(request.params.id, request.user.id);

        if (result.error)
            response.status(404).json(result);
        else
            response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});


// FILTER GETFAVORITES /api/favorites
app.get('/api/favorites', isLoggedIn, async (request, response) => {
    try {

        const result = await dao.listFavorite(request.user.id);

        if (result.error)
            response.status(404).json(result);
        else
            response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});

// FILTER BESTRATED /api/bestrated
app.get('/api/bestRated', isLoggedIn, async (request, response) => {
    try {

        const result = await dao.listBestRated(request.user.id);

        if (result.error)
            response.status(404).json(result);
        else
            response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});

// FILTER SEENLASTMONTH /api/seenLastMonth
app.get('/api/seenLastMonth', isLoggedIn, async (request, response) => {
    try {

        const result = await dao.listSeenLastMonth(request.user.id);

        if (result.error)
            response.status(404).json(result);
        else
            response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});

// FILTER UNSEEN /api/unseen
app.get('/api/unseen', isLoggedIn, async (request, response) => {
    try {

        const result = await dao.listUnseen(request.user.id);

        if (result.error)
            response.status(404).json(result);
        else
            response.json(result);
    } catch (err) {
        response.status(500).end();
    }
});



//DELETE /api/films/:id
app.delete('/api/films/:id', isLoggedIn, async (request, response) => {
    try {
        await dao.deleteFilm(request.params.id, request.user.id);
        response.status(204).end();
    } catch (err) {
        response.status(503).json({ error: `Database error during the deletion of film ${request.params.id}.` });
    }
});

//ADD /api/films
app.post('/api/films', isLoggedIn, [
    //check('favorite').isInt({ min: 0, max: 1 }),
    //check('rating').isInt({ min: 0, max: 5 }),
    //check('watchdate').isBefore(dayjs().format('YYYY-MM-DD')),
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    const film = {
        title: request.body.title,
        favorite: request.body.favorite,
        watchdate: request.body.watchdate,
        rating: request.body.rating,
        user: request.user.id,
    };

    try {
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
app.put('/api/films/:id', isLoggedIn, [
    // check('favorite').isInt({ min: 0, max: 1 }),
    //check('rating').isInt({ min: 0, max: 5 }),
    // check('watchdate').isBefore(dayjs().format('YYYY-MM-DD')),
], async (request, response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    const film = {
        id: request.params.id,
        title: request.body.title,
        favorite: request.body.favorite,
        watchdate: request.body.watchdate,
        rating: request.body.rating,
    };



    try {
        await dao.updateFilm(film, request.user.id);
        response.status(200).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the update of film ${request.params.id}.` });
    }
});

//UPDATEFILMFAVORITE /api/films/:id/:favorite
app.put('/api/films/:id/:favorite', isLoggedIn, [
    // check('favorite').isInt({ min: 0, max: 1 })
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    try {
        await dao.updateFilmFavorite(request.params.id, request.params.favorite, request.user.id);
        response.status(200).end();
    }
    catch (err) {
        response.status(503).json({ error: `Database error during the update of film ${request.params.id}.` });
    }
});


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);

            // req.user contains the authenticated user, we send all the user info back
            // this is coming from userDao.getUser()
            return res.json(req.user);
        });
    })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => { res.end(); });
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    }
    else
        res.status(401).json({ error: 'Unauthenticated user!' });;
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));