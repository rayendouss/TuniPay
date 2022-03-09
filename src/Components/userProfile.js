import React, { Suspense ,useEffect,useState} from "react";
import { useSelector,useDispatch,connect } from "react-redux";
import loadingIcon from "../assets/images/dashboardloader3.gif";
import { mycommande, myPosts   ,deleteP} from "../store/actions/post";
import Commandes from "./Commandes";
import { Row,Col } from 'reactstrap';
import {useParams} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/PopularProducts.scss";
import {  useToasts } from 'react-toast-notifications';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faEye,faStore,faFolder, faFolderOpen, faFolderPlus,faTrash } from "@fortawesome/free-solid-svg-icons";
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import "./ProfileCard.css"
import introJs from 'intro.js';
import HeroImage from "../Components/Navigation/HeroImage";
import { Container } from "react-bootstrap";
import {userPost,userDetail,list_vues} from "../store/actions/post"
const TopBanner = React.lazy(() => import("./Navigation/TopBanner"));
const HeroText = React.lazy(() => import("./Navigation/HeroText"));
const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));

const UserProfile=({user,myCmd,myPost,deletep}) => {
  const [stepsEnabled,setstepsEnabled]=useState(true)
  const [products,setProducts]=useState(true)
  const [commandes,setCommandes]=useState(false)
    const [PopularProductData,setPopularProductData]=useState([])
    const [MyCommandes,setMyCommandes]=useState([])
    const [profileD,setProfileD]=useState()
    const[vues,setVues]=useState([])
    const onExit=()=>{
      setstepsEnabled(false)
     
    }
    const intro = 
{
  stepsEnabled,
  initialStep:0,
  steps : 
  [
    {
    element: '#myproduct',
    intro: '<strong>  Products </strong> <br> Cliquez pour voir la liste de vos produits',
    position: 'right',
   
  },
 
 
]}
const {id,action} =useParams();
useEffect(()=>{
  list_vues(id)
  userDetail(id).then((res)=>{
    
    setVues(res.data.list_vues)
    setProfileD(res.data)
  }

  )

 

},[])

  
  
  useEffect(()=>{
    userPost(id).then((res)=>{
       console.log(res.data.post)
       setMyCommandes(res.data.post)
      
     }

     )
  },[])
 
 
      

    const data = PopularProductData.map((product) => {
      return (
        <div className="popular-product" key={product._id}>
          <div className="card-product">
            <img
              src={product.photo}
              alt={product.photo}
            />
  
            <div className="card-product-extra-info">
              <div className="card-product-icon">
               
  
                <span>
                  <Link
                    className="card-product-cart-icon"
                    to={`/catalog/item/${product._id}/${product.title}/view`}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </span>
              
              </div>
  
              <h4>{product.title}</h4>
  
             
                <h2>
                  <span className="product-price-after-discount">
                  
                     { product.price} 
                    
                  </span>{" "}
                
                  <span className="product-discount-rate">
                  <div className="bannerStockLevel">{product.quantite} piéces</div>
                  </span>
                </h2>
         
            </div>
          </div>
        </div>
      );
    });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,

    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
    return(
     
            <div>
              <Suspense
                fallback={
                  <img src={loadingIcon} alt="loading" className="loadingIcon" />
                }
              >
               
                <TopBanner />
                <NavBar />
                <HeroImage />
                <Steps 
         enabled={intro.stepsEnabled}
         steps={intro.steps}
         initialStep={intro.initialStep}
         options={{
           showStepNumbers:true,
           doneLabel:"Finish",
           nextLabel:"Next"
         }}
         onExit={()=>onExit()}

      />
      <div>
{ profileD && 
<div style={{
            display:"flex",
            justifyContentContent: "space-around",
            margin:"50px 30px",
            borderBottom:"1px solid grey"
        }}>
          
        
            <div>
                <img style={{width:"160px" ,height:"160px",borderRadius:"80px"}}
                src={profileD?profileD.photo:"loading"}
                />
    
    <div className="file-field input-field">
    
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>


            </div>
            <div style={{margin:"0px 100px"}}>
              <h4>{profileD.name} {profileD.lastname}</h4>  
              <div style={{
            display:"flex",
            justifyContentContent: "space-between",
            width:"300%",
          whiteSpace:"pre"
        }}>
            <h6>{MyCommandes.length} Posts    </h6>
            <h6>{vues.length} Vues    </h6>
       

              </div>
            </div>
        </div>
        
        } </div>
         <div class="rightside">
       <Grid container spacing={2}>
      {
            
     MyCommandes.map((item)=>{
        return(
            <div className="row">
      
    
              <div class="video_card">
      <div class="card-head" style={{backgroundImage:`url(${item.photo})`}}>
        <div class="tag">New</div>
      </div>
      <div class="card-body">

        <div className="container" style={{top:"50px"}}>
          
        <div> <h5> Title :</h5> <p>{item.title}</p></div>
          
        <div>  <h5>  Description :</h5><p>  {item.body}</p> </div>
        <div> <h5>  Prix : </h5><p> {item.price} DT </p> </div>
        <div> <h5>  Quantite :</h5> <p> {item.quantite}</p></div>
        </div>
   
             <div style={{marginLeft: "150px"}}>  
             <Link
                    className="card-product-cart-icon"
                    to={`commande/item/${item._id}`}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>   </div>
            
      </div>
    </div> 
   
 
    
            </div> 
        )
     }  
     )
   
    }
    </Grid>
    </div>
      <br></br>
        <br></br>
        <Footer />
      </Suspense>
    </div>
  )

 
}

const mapStateToProps =(state) =>{
  return {
    user:state.authReducer.user,
    cmnds:state.postReducer.mycommandes
  }
}
const mapDispatchToProps=dispatch=> {
  return {
    myPost:()=>dispatch(myPosts()),
    myCmd:()=>dispatch(mycommande()),
    deletep:(id)=>dispatch(deleteP(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);