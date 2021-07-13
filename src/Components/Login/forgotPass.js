import React, { useState } from 'react';
import uiImg from '../../assets/images/pass.svg';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from 'axios';

const ForgetPass = ({history}) => {
  const [email, setEmail] = useState("");

  
  const submitForm = e => {
    e.preventDefault();
 };
  return (
    <Container className="mt-5">
   
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3" >
             
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
            Forgot Password
            </h1>
        <br/>
        <br/>
            <Form onSubmit={submitForm}>
                    <Form.Group  >
                            <Form.Control type="name" placeholder="Enter email"  onChange={e=>setEmail(e.target.value)}
                                      value={email} />
                        </Form.Group>
                        <Button variant="primary btn-block" type="submit" >Submit</Button>
                        </Form>
      
                   
                </Col>
                
                <Col lg={8} md={6} sm={12}>
                <img className="w-100" src={uiImg} alt=""/>
                </Col>
            </Row>

        </Container>
  );
};

export default ForgetPass;