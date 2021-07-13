import React,{useState}  from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from '../../assets/images/user.png'
import uiImg from '../../assets/images/activate.svg';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions/auth';
import jwt from 'jsonwebtoken';
import { useHistory  } from "react-router-dom";
import './Login.css'
import {  useToasts } from 'react-toast-notifications';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import axios from 'axios';
const Activate = (props) => {
    let { token } = useParams();
    let { name } = jwt.decode(token);   
    const { addToast } = useToasts();
    const handleSubmit = e => {
        e.preventDefault();
    
    console.log(token)

    axios
    .post("http://localhost:5000/activation", {
      token
    }).then(res=>{
        addToast(res.data.message, { appearance: 'success', autoDismiss: true })
    })
      };
    return (
        <Container className="mt-5">
   
            <Row>
                <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3" >
                <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Welcome {name}
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  style={{backgroundColor:"#FF6363"}}
               >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Activate your Account</span>
                </button>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign up again
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/register'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign Up</span>
                </a>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign In</span>
                </a>
              </div>
            </form>
          </div>
                    <Form >
                    <Form.Group  >
                       
                        </Form.Group>

                     
                        <div className="text-left mt-3">
                             
                             
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

export default Activate;