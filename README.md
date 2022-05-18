# BigLab 2 - Class: 2022 AW1

## Team name: CSMS

Team members:
* s295829 Acquaro Claudio
* s302948 Matranga Sonia
* s303393 Belloni Sofia
* s281221 Pepe Manuel 

## Instructions

A general description of the BigLab 2 is avaible in the `film-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but please double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |

## List of APIs offered by the server

Provide a short description of the API you designed, with the required parameters. Please follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [A (small) sample request, with body (if any)]
* [A (small) sample response, with body (if any)]
* [Error responses, if any]

### __List films__

URL: `/films`

HTTP Method: GET

Description: Get all the films

Request body: _None_

```
A short example, if any
```

Response: `200 OK` (success) `500` (internal server error) `404` (not found)

Response body:

```
[{
"id": 1,
"title": "Pulp Fiction",
"favorite": 1,
"watchdate": "2022-03-11",
"rating": 5,
"user": 0
}]
```

### __Get a film (by id)__

URL: `/films/film`

HTTP Method: GET

Description: Get a film by code

Request body: _None_

Response: `200 OK` (success) `500` (internal server error) `404` (not found)

Response body:

```
{
"id": 1,
"title": "Pulp Fiction",
"favorite": 1,
"watchdate": "2022-03-11",
"rating": 5,
"user": 0
}
```

### __Get favorite films__

URL: `/api/favorites`

HTTP Method: GET

Description: Get all the favorite films

Request body: _None_

```
A short example, if any
```

Response: `200 OK` (success) `500` (internal server error) `404` (not found)

Response body:

```
[{
"id": 1,
"title": "Pulp Fiction",
"favorite": 1,
"watchdate": "2022-03-11",
"rating": 5,
"user": 0
},
{
"id": 2,
"title": "21 Grams",
"favorite": 1,
"watchdate": "2022-03-17",
"rating": 4,
"user": 0
}]
```

### __Get best rated films__

URL: `/bestRated`

HTTP Method: GET

Description: Get all the best rated films

Request body: _None_

```
A short example, if any
```

Response: `200 OK` (success) `500` (internal server error) `404` (not found)

Response body:

```
[{
"id": 1,
"title": "Pulp Fiction",
"favorite": 1,
"watchdate": "2022-03-11",
"rating": 5,
"user": 0
}]
```

### __Get films seen last month__

URL: `/seenLastMonth`

HTTP Method: GET

Description: Get all the films seen last month

Request body: _None_

```
A short example, if any
```

Response: `200 OK` (success) `500` (internal server error) `404` (not found)

Response body:

```
[{
"id": 1,
"title": "Pulp Fiction",
"favorite": 1,
"watchdate": "2022-03-11",
"rating": 5,
"user": 0
}]
```

### __Get unseen filmsh__

URL: `/seenLastMonth`

HTTP Method: GET

Description: Get all the unseen films

Request body: _None_

```
A short example, if any
```

Response: `200 OK` (success) `500` (internal server error) `404` (not found)

Response body:

```
[{
"id": 3,
"title": "Star Wars",
"favorite": 0,
"watchdate": null,
"rating": null,
"user": 0
}]
```

### __Delete a film__

URL: `/films/<id>`

HTTP Method: DELETE

Description: Delete a film from the collection films

Request body: _None_

Response: `204` (success) `503` (internal server error)

Response body: _None_ 

### __Update a film__

URL: `/films/<id>`

HTTP Method: PUT

Description: Update a film from the collection films with the given id

Request body:

```
{
"title": "Avatar 2",
"favorite": 0,
"watchdate": null,
"rating": null,
"user": 0
}
```

Response: `200 OK` (success) `503` (internal server error) `422` (not found)

Response body: _None_ 

### __Update favorite attribute of a film__

URL: `/films/<id>/<favorite>`

HTTP Method: PUT

Description: Update favorite attribute of a filmfrom the collection films with the given id

Request body: ```None ```

Response: `200 OK` (success) `503` (internal server error) `404` (not found)

Response body: _None_ 

### __Add a film__

URL: `/films/<film>`

HTTP Method: POST

Description: Adds a film to the collection films

Request body:

```
{
"title": "Avatar 2",
"favorite": 0,
"watchdate": null,
"rating": null,
"user": 0
}
```

Response: `201 OK` (success) `503` (internal server error) `422` (not found)

Response body: _None_ 

