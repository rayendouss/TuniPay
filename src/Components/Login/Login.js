import React,{useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from '../../assets/images/user.png'
import uiImg from '../../assets/images/log.svg';
import './Login.css'
import { useDispatch } from 'react-redux';
import {   Link ,useHistory  } from "react-router-dom";
import { login } from '../../store/actions/auth';
const Login = () => {
    let history = useHistory();
    const dispatch=useDispatch()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const submitForm=(e)=>{
        e.preventDefault()
        console.log("a",{email,password})
        dispatch(login({email,password})).then(
            ()=>history.push('/home')
        )
        
    }
    return (
        <Container className="mt-5">
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3" >
                    <img className="icon-img" src={loginIcon} alt="icon" />
                    <Form onSubmit={submitForm}> 
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}
                                      value={email} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" >
                            <Form.Control type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)}
                                      value={password} />
                        </Form.Group>

                        <Button variant="primary btn-block" type="submit" >Login</Button>
                        <div className="text-left mt-3">
                                <a href="#"><small className="reset">Password Reset</small></a> II
                                <a href="#"><small className="reset ml-2"><Link to="/register">Register</Link></small></a>
                            </div>
                    </Form>
                </Col>
                <Col lg={8} md={6} sm={12}>
                <img className="w-100" src={uiImg} alt=""/>
                </Col>
            </Row>

        </Container>
            );
};

export default Login;