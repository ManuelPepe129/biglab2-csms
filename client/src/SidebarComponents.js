import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();

    return (
        <>
        <br />
        <Nav defaultActiveKey="1" className="flex-column ">
            <Nav.Link className="list-group-item list-group-item-action" eventKey="1" onClick={() => { navigate('/') }}>All</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="2" onClick={() => { navigate('/filter/Favorites') }}>Favorites</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="3" onClick={() => { navigate('/filter/Best Rated') }}>Best Rated</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="4" onClick={() => { navigate('/filter/Seen Last Month') }}>Seen Last Month</Nav.Link>
            <Nav.Link className="list-group-item list-group-item-action" eventKey="5" onClick={() => { navigate('/filter/Unseen') }}>Unseen</Nav.Link>
        </Nav>
        </>

    );
}

export { Sidebar };
