import React, { useState, useContext, Fragment } from "react";
import {
  faBars,
  faShoppingCart,
  faCaretDown,
  faTimes,
  faSignOutAlt,
 faUser,
 
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal/Modal"
import "../../styles/Navbar.scss";
import { AddPost } from "../../store/actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalCartContext } from "../../context/CartContext";
import { Link  ,useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { logout } from "../../store/actions/auth";
export default function NavBar() {
  const { myShoppingCart } = useContext(GlobalCartContext);
  const [toggleNav, setToggelNav] = useState(false);
  const [showModal,setProfileModal]= useState(false)
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
  return (
    <div>
      <header>
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

            <ul className="navigation-list">
              <li>
                <Link to="/home">
                Home
                </Link>
                {/* <a href="/">Home</a>     */}
              </li>
              <li>
              <Link to="#">
              Products
              <i className="icon ">
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
              <li>
                <Link to="#">
                  Collections
                  <i className="icon ">
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

              <li>
                <Link to="/search">Search</Link>
              </li>
           
              <li className="nav-shopping-cart">
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
              <FontAwesomeIcon
                    icon={faUser}
                   style={{color:"white",marginLeft:"20px" ,height:"15px", width:"15px" }}
                  />
              </li>
              <li>
            
                <Link to="#" >
                  Profile
                  <i className="icon ">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </i>
                </Link>
                <ul className="products-cat">
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                  <Link >Update Profile</Link>
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
                    onClick={()=> dispatch(logout())}
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
                                      value={title} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control onChange={e=>setbody(e.target.value)}
                                      value={body} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control onChange={e=>setprice(e.target.value)}
                                      value={price} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control onChange={e=>setqt(e.target.value)}
                                      value={quantite} />
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
          </nav>
        </div>
      </header>
    </div>
  );
}
