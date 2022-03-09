import React, { useState, useContext, Fragment ,useEffect} from "react";
import {
  faBars,
  faShoppingCart,
  faCaretDown,
  faTimes,
  faSignOutAlt,
 faUser,
 
} from "@fortawesome/free-solid-svg-icons";
import Autocomplete from '@mui/material/Autocomplete';
import Badge from '@mui/material/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import axios from "axios";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
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
import FormLabel from '@material-ui/core/FormLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {  useToasts } from 'react-toast-notifications';
import {getMyAlert} from '../../store/actions/post'
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
  const [tailleV,setTailleV] = useState()
  const [marqueV,setmarqueV]=useState()
  const [User,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  const styles =makeStyles ((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  }));
  const { classes } =styles()
  const marque=[
    { label: 'PALM ANGELS', year: 1994 },
    { label: 'AIR JORDAN', year: 1994 },
    { label: 'PRADA', year: 1994 },
    { label: 'DIOR', year: 1994 },
    { label: 'HERMES', year: 1994 },
    { label: 'PULL AND BEAR JEANS', year: 1994 },
    { label: 'NIKE', year: 1994 },
    { label: 'CHANEL', year: 1994 },
    { label: 'CONVERSE', year: 1994 },
    { label: 'DSQUARED2', year: 1994 },
    { label: 'OFF WHITE', year: 1994 },
    { label: 'LE TEMPS DES CERISES', year: 1994 },
    { label: 'LOUIS VUITTON', year: 1994 },
    { label: 'CALVIN KLEIN', year: 1994 },
    { label: 'TOMMY HILFIGER', year: 1994 },
    { label: 'LACOSTE', year: 1994 },
    { label: 'RALPH LAUREN', year: 1994 },
    { label: 'THE NORTH FACE', year: 1994 },
    { label: 'MONCLER', year: 1994 },
    { label: 'VALENTINO', year: 1994 },
    { label: 'BERSHKA', year: 1994 },
    { label: 'MANGO', year: 1994 },
    { label: 'HOLLISTER', year: 1994 },
    { label: 'BURBERRY', year: 1994 },
    { label: 'JACK & JONES', year: 1994 },
    { label: 'STONE ISLAND', year: 1994 },
    { label: 'ADIDAS', year: 1994 },
    { label: 'PUMA', year: 1994 },
    { label: 'ANTONY MORATO', year: 1994 },
    { label: 'BENETTON', year: 1994 },
    { label: 'C&A', year: 1994 },
    { label: 'CELIO', year: 1994 },
    { label: 'DIESEL', year: 1994 },
    { label: 'EDEN PARK', year: 1994 },
    { label: 'HAMADI ABID', year: 1994 },
    { label: 'FRED PERRY', year: 1994 },
    { label: 'G-STAR', year: 1994 },
    { label: 'GANT', year: 1994 },
    { label: 'GAP', year: 1994 },
    { label: 'HACKETT', year: 1994 },
    { label: 'H&M', year: 1994 },
    { label: 'HUGO BOSS', year: 1994 },
    { label: 'JULES', year: 1994 },
    { label: 'LE COQ SPORTIF', year: 1994 },
    { label: "LEVI'S", year: 1994 },
    { label: 'NEW BALANCE', year: 1994 },
    { label: 'REEBOOK', year: 1994 },
    { label: 'REDSKINS', year: 1994 },
    { label: 'SCOTHCH & SODA', year: 1994 },
   ]
   const taille=[
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },

   ]
   const handleChangeT = (event) => {
    console.log("taille",event.target.value)
    setTailleV(event.target.value);
  };
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
  const [gender,setgender]=useState('')
  const [numberalerte,setnumberalerte]=useState(0)
const [myalerte,setmyalerte]=useState([])  
  const { addToast } = useToasts();
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
         dispatch(AddPost({title,body,price,quantite,photo,marqueV,tailleV,gender}))
        
       
      })
  }
 const handleChangeg = event => {
   console.log(event.target.value)
    setgender( event.target.value );
  };


useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
var ide=user._id
    getMyAlert(ide).then(res=>
      {
        setnumberalerte(res.data.critere.length)
        setmyalerte(res.data.critere)
      })
    },[])

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
        if(res.status==200){
          localStorage.setItem('user',JSON.stringify(res.data.user))
          setProfileModalUp(false)
          addToast("your profile is updated", { appearance: 'success', autoDismiss: true, })
        }
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
            
            
               <img  style={{width:"40px", height:"40px", borderRadius: "5px" }} src={User.photo}/> 
              
              
            
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
                  <Link  onClick={()=> setProfileModal(true)}>Add post</Link>
                  </li>
                  <li>
                  <Link>  Show Alert   <Badge badgeContent={numberalerte} color="error" style={{marginLeft:"10px"}} ></Badge> </Link> 
             
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
                            <Form.Control placeholder="Enter Description" onChange={e=>setbody(e.target.value)}
                                      value={body} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control placeholder="Enter price" onChange={e=>setprice(e.target.value)}
                                      value={price} required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" >
                            <Form.Control placeholder="Enter quantity" onChange={e=>setqt(e.target.value)}
                                      value={quantite} required/>
                        </Form.Group>
                        <Card sx={{ width: 200,height:150,marginBottom:"10px" }} >
                        <CardContent>
                        <Form.Group component="fieldset" >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
           
            value={gender}
            onChange={handleChangeg}
          >
            <FormControlLabel value="men" control={<Radio />} label="Femme" />
            <FormControlLabel value="women" control={<Radio />} label="Homme" />
            <FormControlLabel value="kids" control={<Radio />} label="Kids" />
           
          </RadioGroup>
        </Form.Group>
       </CardContent>
        </Card>
                        <Form.Group >
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={marque}
      sx={{ width: 200 }}
      value={marqueV}
      onChange={(event, value) => setmarqueV(value.label)}
      renderInput={(params) => <TextField {...params} label="Marque" />}
    />

      </Form.Group>
                        <Form.Group >
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={taille}
      sx={{ width: 200 }}
 
      onChange={(event, value) => setTailleV(value.value)}
      renderInput={(params) => <TextField {...params} label="Taille" />}
    />
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