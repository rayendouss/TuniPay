import React, { useContext,useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/PopularProducts.scss";
import { connect } from "react-redux";

import { faShoppingBasket, faEye } from "@fortawesome/free-solid-svg-icons";
import { fetchPosts } from "../store/actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { GlobalCartContext } from "../context/CartContext";
import { useToasts } from "react-toast-notifications";
 function PopularProducts({user,fetchPosts}) {
     
  const [PopularProductData,setPopularProductData]=useState([])
  fetchPosts()
 
  .then(res=>{
   
      setPopularProductData(res.posts)
  
  })
  const { addToast } = useToasts();
  const { addItemTocart } = useContext(GlobalCartContext);

  function handleAddToCart(data) {
    
    addItemTocart(data);
    addToast(data.title + " has been saved for later shopping", {
      appearance: "success",
      autoDismiss: true,
    });
  }

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
              onClick={() => handleAddToCart(product)}
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
    slidesToScroll:3,
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

  return (
    <div className="container-popular-products">
      <h1>Latest Products</h1>

      <Slider {...settings} className="popular-product-large-screen">
        {data}
      </Slider>
    </div>
  );
}

const mapStateToProps =(state) =>{
  return {
    user:state.authReducer.user
  }
}
const mapDispatchToProps=dispatch=> {
  return {
    fetchPosts:()=>dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (PopularProducts);