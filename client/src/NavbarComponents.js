import { Container, Navbar, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CollectionPlay, PersonCircle, Search } from 'react-bootstrap-icons';

function MyNavbar(props) {
  return (
    <Navbar variant="dark" bg="primary"  >
      <Container fluid>
        <Navbar.Brand><CollectionPlay width="25" height="25" /></Navbar.Brand>
        <Navbar.Brand>FilmLibrary</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-center">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Type here..."
              className="me-2"
              aria-label="Search"
            />
            <Button className='rounded-circle' variant='light'
            ><Search></Search></Button>
          </Form>
        </Navbar.Collapse>
        <Navbar.Brand><PersonCircle width="25" height="25" fill="currentColor" /></Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export { MyNavbar };

