import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom';
function Sidebar(props) {
    const navigate = useNavigate();

    return (
        <>
            <br />
            <Nav defaultActiveKey="1" className="flex-column ">
                <Nav.Link className="list-group-item list-group-item-action" eventKey="1" onClick={() => { navigate('/'); props.setFilter('') }}>All</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="2" onClick={() => { navigate('/filter/Favorites'); props.setFilter('Favorites') }}>Favorites</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="3" onClick={() => { navigate('/filter/Best Rated'); props.setFilter('Best Rated') }}>Best Rated</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="4" onClick={() => { navigate('/filter/Seen Last Month'); props.setFilter('Seen Last Month') }}>Seen Last Month</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="5" onClick={() => { navigate('/filter/Unseen'); props.setFilter('Unseen') }}>Unseen</Nav.Link>
            </Nav>
        </>

    );
}

export { Sidebar };
