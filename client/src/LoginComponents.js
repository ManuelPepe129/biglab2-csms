import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function LoginForm(props) {
  const [username, setUsername] = useState('testuser@polito.it');
  const [password, setPassword] = useState('password');

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    props.updateMessage("");

    const credentials = { username, password };

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
    }
    else if (username === '' || password === '') {
      props.updateMessage("Email and password cannot be empty ");
      setValidated(false);
    }
    else {
      props.login(credentials);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Login</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Form.Group controlId='username'>
              <Form.Label>email</Form.Label>
              <Form.Control
                type='email'
                hasvalidation={"true"}
                value={username}
                onChange={ev => setUsername(ev.target.value)}
                required />
              <Form.Control.Feedback type="invalid">
                Please choose a valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' hasvalidation={"true"} value={password} onChange={ev => setPassword(ev.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Please insert password
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

function LogoutButton(props) {
  return (
    <Col>
      <span>Welcome, {props.user?.name}</span>{' '}<Button variant="outline-primary" onClick={props.logout}>Logout</Button>
    </Col>
  )
}

export { LoginForm, LogoutButton };