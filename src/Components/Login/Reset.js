import React, { useState } from 'react';
import uiImg from '../../assets/images/pass.svg';
import jwt from 'jsonwebtoken';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from 'axios';
import {  useToasts } from 'react-toast-notifications';
import {
    BrowserRouter as Router,Switch,Route,Link, useParams
  } from "react-router-dom";
const Reset = ({history}) => {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  let { token } = useParams();
  const { addToast } = useToasts();
  const submitForm = e => {
    e.preventDefault();
 
    console.log(token)
    if((email == email2)&&email){
      axios.put('http://localhost:5000/resetpassword',{
        resetPasswordlink:  token,
        newPassword:email
        }).then(res=>{
            addToast(res.data.message, { appearance: 'success', autoDismiss: true })
        })
    }
    else {
        addToast("password not compatible", { appearance: 'success', autoDismiss: true })
    }
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
                            <Form.Control type="password" placeholder="Enter password"  onChange={e=>setEmail(e.target.value)}
                                      value={email} />
                        </Form.Group>
                        <Form.Group  >
                            <Form.Control type="password" placeholder="Enter password"  onChange={e=>setEmail2(e.target.value)}
                                      value={email2} />
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

export default Reset;