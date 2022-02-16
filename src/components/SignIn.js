import React from 'react';
import { Link } from "react-router-dom";
import picLogScreen from '../assets/picLogScreen.png'
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import './SignIn.css';

export default function SignIn() {
    return (
        <Container id="main-container" className="d-grid h-100">
            <Row>
                <Col sm={7}>
                    <img class="info-Banner" src={picLogScreen} alt="picLogScreen"/>
                </Col>

                <Col sm={4}>
                <Form>
                    <h1 className="header-css">Login to your account</h1>
          
  
                <Form.Group className="mb-3" controlId="form-Basic-Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="form-Basic-Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"/>
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="submit-form">
                    <Button variant="outline-info" type="submit">
                        Login
                    </Button> 
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="link-to-SignUp">
                    <Button variant="secondary" type="submit">
                        Dont have an account?
                    </Button>
                </Form.Group>
 
                </Form>
                </Col>
            </Row>
        </Container>
    ); 
}