import { propTypes } from 'react-bootstrap/esm/Image';
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom';
function Sidebar(props) {
    const navigate = useNavigate();

    return (
        <>
            <br />
            <Nav defaultActiveKey="1" className="flex-column ">
                <Nav.Link className="list-group-item list-group-item-action" eventKey="1" onClick={() => { props.updateFilter('all') }}>All</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="2" onClick={() => { props.updateFilter('Favorites') }}>Favorites</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="3" onClick={() => { props.updateFilter('Best Rated') }}>Best Rated</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="4" onClick={() => { props.updateFilter('Seen Last Month') }}>Seen Last Month</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action" eventKey="5" onClick={() => { props.updateFilter('Unseen') }}>Unseen</Nav.Link>
            </Nav>
        </>

    );
}

export { Sidebar };
