import React, { Suspense ,useEffect,useState} from "react";
import { useSelector,useDispatch,connect } from "react-redux";
import loadingIcon from "../assets/images/dashboardloader3.gif";
import { mycommande, myPosts   } from "../store/actions/post";
import Commandes from "./Commandes";
import { Row,Col } from 'reactstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/PopularProducts.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faEye,faStore,faFolder, faFolderOpen, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import HeroImage from "../Components/Navigation/HeroImage";
import { Container } from "react-bootstrap";
const TopBanner = React.lazy(() => import("./Navigation/TopBanner"));
const HeroText = React.lazy(() => import("./Navigation/HeroText"));
const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));
const Profile=({user,myCmd,myPost}) => {
  const [products,setProducts]=useState(true)
  const [commandes,setCommandes]=useState(false)
    const [PopularProductData,setPopularProductData]=useState([])
    const [MyCommandes,setMyCommandes]=useState([])
  useEffect(()=>{
     myCmd().then((res)=>{
       
       setMyCommandes(res.result)
      
     }

     )
  },[])
   
    const setProd=()=>{
      setCommandes(false)
       setProducts(true)
    }
    const setCmd=()=>{
     console.log(MyCommandes)
    
      setProducts(false)
      setCommandes(true)
     
    }
    myPost()  
    .then(res=>{

        setPopularProductData(res.mypost)
    })
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
                <span
                  className="card-product-cart-icon add-to-cart-icon"
                 
                >
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </span>
  
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
        <p> welcome {user.name } </p>
        <div style={{display:"flex",justifyContent:"center"  }} >
        <h1 className="text-center " onClick={()=>setProd()}> <FontAwesomeIcon icon={faStore}  />My Products</h1>
        <h1 className="text-center " style={{marginLeft:"20px"}} onClick={()=>setCmd()}> <FontAwesomeIcon icon={faFolderOpen} />My Commandes</h1>
        </div>
        { products ?
        <div>
        {  PopularProductData.length > 0 ?
        <div>
          
        <Slider {...settings} className="popular-product-large-screen">
       {data}
      </Slider></div>
        :
        <h1 className="text-center ">  Products List is empty</h1>
        }
       </div>
       :
       ""
}
{ commandes ?
        <div>
        {  MyCommandes.length > 0 ?
        
         
            <Commandes />
           
         
   
      
        :
        <h1 className="text-center ">  Commandes List is empty</h1>
        } 
       </div>
       :
       ""
}
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
    myCmd:()=>dispatch(mycommande())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);