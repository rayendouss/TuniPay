import React, { Suspense ,useEffect,useState} from "react";
import { useSelector,useDispatch,connect } from "react-redux";
import loadingIcon from "../assets/images/dashboardloader3.gif";
import { myPosts } from "../store/actions/post";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/PopularProducts.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faEye } from "@fortawesome/free-solid-svg-icons";
import HeroImage from "../Components/Navigation/HeroImage";
const TopBanner = React.lazy(() => import("./Navigation/TopBanner"));
const HeroText = React.lazy(() => import("./Navigation/HeroText"));
const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));
const Profile=({user,myPost}) => {
    
    const [PopularProductData,setPopularProductData]=useState([])
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
                    to={`/catalog/item/${product.id}/${product.productname}`}
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
        <h1>My Products</h1>
        <Slider {...settings} className="popular-product-large-screen">
       {data}
      </Slider>
      <br></br>
        <br></br>
        <Footer />
      </Suspense>
    </div>
    )
}

const mapStateToProps =(state) =>{
  return {
    user:state.authReducer.user
  }
}
const mapDispatchToProps=dispatch=> {
  return {
    myPost:()=>dispatch(myPosts())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);