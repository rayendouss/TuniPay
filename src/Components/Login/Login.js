import React,{useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from '../../assets/images/user.png'
import uiImg from '../../assets/images/log.svg';
import './Login.css'
import { useDispatch } from 'react-redux';
import {   Link ,useHistory  } from "react-router-dom";
import { login } from '../../store/actions/auth';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
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
const responseGoogle= response => {
    console.log(response)
    sendGoogleToken(response.tokenId)
}
    const sendGoogleToken = tokenId => {
        axios.post("http://localhost:5000/googlelogin",{
            idToken:tokenId
        })
        .then(res=>
         { console.log(res)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            history.push('/home')
        }
        )
        .catch((err)=>{
            console.log("google login error")
        })
    }
    const responseFacebook= response => {
        console.log(response)
        sendFacebookToken(response.userID,response.accessToken)
    }
    const sendFacebookToken=(userID,accessToken)=>{
        axios.post("http://localhost:5000/FBlogin",{
            userID,accessToken
        }).then(res => {
            history.push('/home')
        })  .catch((err)=>{
            console.log("fb login error")
        })
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
<hr></hr>
                        <GoogleLogin
                  clientId="5098527572-mo5b3f542b9cnp5odp1aslf6a4g8uh4d.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Sign In with Google</span>
                    </button>
                  )}
                ></GoogleLogin>
  
              <FacebookLogin
                  appId="1151630195337738"
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Sign In with Facebook</span>
                    </button>
                  )}
                />
                        <div className="text-left mt-3">
                                <a href="#"><small className="reset"><Link to="/password/forgot">Password Reset</Link></small></a> II
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