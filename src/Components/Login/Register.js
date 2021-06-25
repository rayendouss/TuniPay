import React,{useState}  from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from '../../assets/images/user.png'
import uiImg from '../../assets/images/register.svg';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions/auth';
import { useHistory  } from "react-router-dom";
import './Login.css'

const Register = () => {
    let history = useHistory();
    const dispatch=useDispatch()
    const [email,setEmail]=useState('') 
      const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const submitForm=(e)=>{
        e.preventDefault()
        dispatch(register({name,email,password})).then(
            ()=>history.push('/home')
        )
    }
    return (
        <Container className="mt-5">
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3" >
                    <img className="icon-img" src={loginIcon} alt="icon" />
                    <Form onSubmit={submitForm}>
                    <Form.Group  >
                            <Form.Control type="name" placeholder="Enter name"  onChange={e=>setName(e.target.value)}
                                      value={name} />
                        </Form.Group>
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
                             
                                <a href="#"><small className="reset ml-2">Login</small></a>
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

export default Register;