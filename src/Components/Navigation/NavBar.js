import React, { useState, useContext, Fragment ,useEffect} from "react";
import {
  faBars,
  faShoppingCart,
  faCaretDown,
  faTimes,
  faSignOutAlt,
 faUser,
 
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import use from "../../assets/images/use.svg"
import Modal from "./Modal/Modal"
import "../../styles/Navbar.scss";
import { AddPost } from "../../store/actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalCartContext } from "../../context/CartContext";
import { Link  ,useHistory} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { logout } from "../../store/actions/auth";
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import introJs from 'intro.js';

 function NavBar({user}) {
  const { myShoppingCart } = useContext(GlobalCartContext);
  const [profileP, setProfileP] = useState(false);
  const [toggleNav, setToggelNav] = useState(false);
  const [showModal,setProfileModal]= useState(false)
  const [showModalUp,setProfileModalUp]= useState(false)
  const [photoPr,setimagePr]=useState('')
  const [email,setEmail]=useState('') 
  const [lastn,setLastN]=useState('') 
    const [name,setName]=useState('')
    const [dateB,setDateB]=useState('')
  const [password,setPassword]=useState('')
  const [address,setaddress]=useState('')
  const [stepsEnabled,setstepsEnabled]=useState(true)

const dispatch= useDispatch()
let history = useHistory();
  function handleToggle(e) {
    e.preventDefault();
    setToggelNav(!toggleNav);
  }
 
  const [title,settitle]=useState('')
  const [body,setbody]=useState('')
  const [price,setprice]=useState('')
  const [photo,setimage]=useState('')
  const [quantite,setqt]=useState('')
  const submitForm=(e)=>{
      e.preventDefault()
      const data= new FormData()
      data.append("file",photo)
      data.append("upload_preset","stagePFE")
      data.append("cloud-name","mernrayen")
      fetch("https://api.cloudinary.com/v1_1/mernrayen/image/upload",{
          method:"post",
          body:data
      }).then(res=>res.json())
      .then(data =>{
       
         setimage(data.url)
         console.log(photo)
       //  console.log(title,body,price,quantite,image)
         dispatch(AddPost({title,body,price,quantite,photo})).then(history.push('/profile'))
        
       
      })
  }

  const submitFormPr=(e)=>{
    e.preventDefault() 
    const data= new FormData()
    data.append("file",photoPr)
    console.log(name,lastn,dateB,address,photoPr)
    data.append("upload_preset","stagePFE")
    data.append("cloud-name","mernrayen")
    fetch("https://api.cloudinary.com/v1_1/mernrayen/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data =>{
     
      setimagePr(data.url)
       console.log(data.url)
     //  console.log(title,body,price,quantite,image)
      axios.put('http://localhost:5000/updatePr',
      {
            email:user.email,
            name:name,
            lastname:lastn,
            password:password,
            birth:dateB,
            photo:data.url,
            _id:user._id,
            address:address,
            genre:"homme"},
            { headers: {
              'Authorization':`tuniPay ${localStorage.getItem('token')}`
            }}
      ).then(res=>{
        console.log(res)
      })
      
     
    })
  }
const submitlogout=(e)=>{
  e.preventDefault()
  dispatch(logout())
    history.push('/')
  
  
}
const onExit=()=>{
  setstepsEnabled(false)
  localStorage.setItem('userguide',"true")
}
const intro = 
{
  stepsEnabled,
  initialStep:0,
  steps : 
  [
    {
    element: '#home',
    intro: '<strong> Home page </strong> <br> Consulter la page d'+"'"+'acceuil',
    position: 'right',
   
  },
  {
    element: '#product',
    intro: '<strong> Product page </strong> <br> Consulter la page de nos produits',
    position: 'right',
   
  },
  {
    element: '#collection',
    intro: '<strong> Collection page </strong> <br> Consulter la page de nos collections',
    position: 'right',
   
  },
  {
    element: '#search',
    intro: '<strong> Search page </strong> <br> Cherche un page',
    position: 'right',
   
  },
  {
    element: '#panier',
    intro: '<strong> Cart page </strong> <br> La liste des produits ajout'+"é"+'au panier',
    position: 'right',
   
  },
  {
    element: '#profile',
    intro: '<strong> Profile page </strong> <br> Consulter votre profile',
    position: 'right',
   
  }
]}




  return (
    <div>
      <header>
       
       {localStorage.getItem('userguide')=="false" ? <Steps 
         enabled={intro.stepsEnabled}
         steps={intro.steps}
         initialStep={intro.initialStep}
         options={{
           showStepNumbers:true,
           doneLabel:"Finish",
           nextLabel:"Next"
         }}
         onExit={()=>onExit()}

      />:""}
        <div className="container-nav">
          <nav className={` ${toggleNav ? "active" : ""}`}>
            <div className="menu-icon">
              <FontAwesomeIcon
                icon={faBars}
                className="menu-icon-bar"
                onClick={(e) => handleToggle(e)}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className="menu-icon-close"
                onClick={(e) => handleToggle(e)}
              />
            </div>

            <ul className="navigation-list" >
              <li id="home">
                <Link to="/home">
                Home 
                </Link>
                {/* <a href="/">Home</a>     */}
              </li>
              <li id="product">
              <Link to="#">
              Products
              <i className="icon " id="product">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
               
                <ul className="products-cat">
                  <li>
                    <Link to="/collections">All</Link>
                    
                  </li>
                  <li>
                    <Link to="/collections/men">Men</Link>
                  </li>
                  <li>
                    <Link to="/collections/women">Women</Link>
                  </li>
                  <li>
                    <Link to="/collections/kids">Kids</Link>
                  </li>
                </ul>
              </li>
              <li id="collection">
                <Link to="#" >
                  Collections
                  <i className="icon " >
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
                <ul className="products-cat">
                  <li>
                    <Link to="/trend/New">New Arrival</Link>
                  </li>
                  <li>
                    <Link to="/trend/Trending">Trending</Link>
                  </li>
                </ul>
              </li>

              <li id="search">
                <Link to="/search">Search</Link>
              </li>
               
                
              <li className="nav-shopping-cart" style={{marginRight:"30px"}} id="panier">
                <Link
                  to="/cart"
                  className="cart position-relative d-inline-flex"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="store-cart-icon"
                  />
                 
                  <span className="cart-basket d-flex align-items-center justify-content-center ">
                    {myShoppingCart.length}{" "}
                  </span>
                </Link>
               
              </li>
              
              <li>
            
            
               <img  style={{width:"40px", height:"40px", borderRadius: "5px" }} src={user.photo}/> 
              
              
            
              </li>
       
              <li id="profile">
            
                <Link to="#"  >
                  Profile
                  <i className="icon " >
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
                <ul className="products-cat">
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                  <Link onClick={()=> setProfileModalUp(true)}>Update Profile</Link>
                  </li>
                  <li>
                  <Link  onClick={()=> setProfileModal(true)}>Add Post</Link>
                  </li>
                 
                </ul>
           
             
               
              
            
               </li>
              <li style={{color:"white", marginLeft:"10px" }}>
               
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="store-cart-icon"
                    onClick={(e)=> submitlogout(e)}
                  />
              </li>

              <li style={{color:"white", marginLeft:"50px" }}>
             
           </li>
            
            </ul>
            { showModal &&
               <Modal click={()=> setProfileModal(false)}>
                   <Fragment key="header">
                     Add Post
                   </Fragment >
                   <Fragment key="body">
                   <Form onSubmit={submitForm}> 
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control  placeholder="Enter title" onChange={e=>settitle(e.target.value)}
                                      value={title} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control onChange={e=>setbody(e.target.value)}
                                      value={body} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control onChange={e=>setprice(e.target.value)}
                                      value={price} required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control onChange={e=>setqt(e.target.value)}
                                      value={quantite} required/>
                        </Form.Group>
                        <Form.Group  >
                            <input onChange={e=>setimage(e.target.files[0])} type="file" />
                        </Form.Group>
                        

                        <Button variant="primary btn-block" type="submit" >Add Post</Button>
                       
                    </Form>
                   </Fragment>
                   <Fragment key="footer">
                     
                   </Fragment>
               </Modal>
            }


          { showModalUp &&
               <Modal click={()=> setProfileModalUp(false)}>
                   <Fragment key="header">
                     Update Profile
                   </Fragment >
                   <Fragment key="body">
                   <Form onSubmit={submitFormPr}> 
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control  placeholder="Enter name" onChange={e=>setName(e.target.value)}
                                      value={name} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control  placeholder="Enter Lastname" onChange={e=>setLastN(e.target.value)}
                                      value={lastn} required/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control  placeholder="Enter Password" type="password" onChange={e=>setPassword(e.target.value)}
                                      value={password} required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control  placeholder="Enter Address" onChange={e=>setaddress(e.target.value)}
                                      value={address} required/>
                        </Form.Group>
                        <Form.Group controlId="dob">
                        
                        <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={e=>setDateB(e.target.value)}
                                      value={dateB} required/>
                    </Form.Group>
                        <Form.Group  >
                            <input onChange={e=>setimagePr(e.target.files[0])} type="file" />
                        </Form.Group>
                        

                        <Button variant="primary btn-block" type="submit" >Update</Button>
                       
                    </Form>
                   </Fragment>
                   <Fragment key="footer">
                     
                   </Fragment>
               </Modal>
            }
          </nav>
        </div>
      </header>
    </div>
  );
}
const mapStateToProps =(state) =>{
  return {
    user:state.authReducer.user,
    
  }
}

export default connect(mapStateToProps,null)(NavBar)