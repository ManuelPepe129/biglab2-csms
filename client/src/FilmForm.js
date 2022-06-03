import { Form, Button, Alert } from 'react-bootstrap';
import ReactStars from 'react-stars';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function FilmFormWrapper(props) {
    const { filmId } = useParams();

    const navigate = useNavigate();

    const location = useLocation().pathname;

    const filmToEdit = props.films.find((f) => f.id.toString() === filmId);

    return (
        (!filmToEdit && location !== '/add') ?
            (<>
                <h1>Film id not valid</h1>
                <Button className='mx-3' variant="secondary" onClick={() => navigate('/')}>
                    Return to home
                </Button>
            </>) :
            <FilmForm addFilm={props.addFilm} films={props.films} filmToEdit={filmToEdit} />
    );
}

function FilmForm(props) {

    const [title, setTitle] = useState(props.filmToEdit ? props.filmToEdit.title : '');
    const [watchdate, setDate] = useState(props.filmToEdit ? props.filmToEdit.watchdate : '');
    const [favorite, setFavorite] = useState(props.filmToEdit ? props.filmToEdit.favorite : false);
    const [rate, setRate] = useState(props.filmToEdit ? props.filmToEdit.rating : 0);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const newRate = (newRating) => {
        setRate(newRating);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const dateObject = dayjs(watchdate);

        if (title.trim().length === 0) {
            setErrorMsg('Title name can not be empty');
        } else if (rate < 0 || rate > 5) {
            setErrorMsg('Film rating must be between 0 and 5');
        } else if (dateObject.isValid() && dateObject.isAfter(dayjs())) {
            setErrorMsg('Date can not be in a future day');
        } else {
            const id = props.filmToEdit ? props.filmToEdit.id : props.films.at(-1).id + 1;
            const newDate = dateObject.isValid() ? watchdate : null;
            const newFilm = { id: id, title: title.trim(), favorite: favorite, watchdate: newDate, rating: rate }
            props.addFilm(newFilm);
            navigate('/');
        }
    }

    return (<>
        {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    required
                    type="text"
                    autoFocus
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Whatch Date</Form.Label>
                <Form.Control
                    type="date"
                    value={dayjs(watchdate).format('YYYY-MM-DD')}
                    onChange={ev => setDate(dayjs(ev.target.value))}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check inline type="checkbox" label="Favorite" onChange={(event) => setFavorite(event.target.checked)} defaultChecked={favorite} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Rate</Form.Label>
                <ReactStars
                    value={rate}
                    count={5}
                    edit={true}
                    half={false}
                    size={24}
                    color2={'#ffd700'}
                    onChange={newRate}
                />
            </Form.Group>
            <br />

            <Button type='submit' variant="primary">
                {props.filmToEdit ? 'Save' : 'Add Film'}
            </Button>

            <Button className='mx-3' variant="secondary" onClick={() => navigate('/')}>
                Cancel
            </Button>


        </Form>
    </>);
}
export { FilmFormWrapper };