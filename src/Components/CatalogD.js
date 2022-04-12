import React , {useState,useContext,Fragment, useEffect} from "react";
import NavBar from "./Navigation/NavBar";
import Footer from "./Navigation/Footer";
import HeroImage from "./Navigation/HeroImage";
import {GlobalCartContext} from '../context/CartContext';
import { post } from "../store/actions/post";
import TopBanner from "./Navigation/TopBanner";
import { connect } from "react-redux";
import "../styles/ProductDetails.scss";
import {sendMailpr} from "../store/actions/post"
import Modal from './Modal/Modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCartPlus,
  faCheckCircle,
  faPlaneDeparture,
  faRedoAlt,
  faCommentDots,
  faLink,
  faEnvelope,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import ProductDetails from "./ProductDetails";
import {  useToasts } from 'react-toast-notifications';
import {
  
  Link,
  useParams
} from "react-router-dom";
 function Catalog({user,fetchPost}) {
  const [showModalOption,setShowModalOption]=useState(false)
  const [displaySocialInputs,setdisplaySocialInputs]=useState(false)
  const [mail,setEmail]=useState("")
  const [count,setCount]=useState(1)
  const {id,action} =useParams();
  const { addToast } = useToasts();
  const [postedBy,setPostedBy]=useState(1)
  const [prod_selected_size,setProd_prod_selected_size]=useState()
  let selectedProduct = "";
  const [ProductData,setProductData]=useState([])
  
  useEffect(()=>{
    fetchPost(id)
    .then(res=>{
       setPostedBy(res.post.postedBy)
        setProductData(res.post)
        setProd_prod_selected_size(res.post.taille)
      
    })
  },[])
 
 
  let discount =0
  let brand="not now"
  let color="not now"
  let bannerStockLevel = "";
  let stockLevelMessage = "";
  let productDescription = [];
 
 
  const productStockLevel = ProductData.quantite;
   if (productStockLevel > 0 && productStockLevel < 40) {
     bannerStockLevel = "product-details-banner-stock-level-low";
     stockLevelMessage = `Low stock, only ${productStockLevel} left.`;
   } else if (productStockLevel === 0) {
     bannerStockLevel = "product-details-banner-stock-level-out-of-stock";
     stockLevelMessage = `Out of  stock`;
   }
   function sendMail(data) {
     
     sendMailpr(id,data).then(res=>{
       console.log('res',res)
       if(res.status=200){
        setdisplaySocialInputs(false)
        addToast("mail envoyé à "+data,{appearance:"success"})
       }
     })
    
  
   }

   const {addItemTocart}= useContext(GlobalCartContext)
  
  function  handleAddToCart(data) {
   data.count=count
    addItemTocart(data);
    addToast(data.title+" has been saved for later shopping", { appearance: 'success', autoDismiss: true, })
  }

  function decrease () {
   if(count>1){
    setCount(count-1)
   }
  }

  function increase  (data)  {
   
    if(count<data){
      setCount(count+1)
     }
   
  }


function handleChangeSize(event) {
    
   // setProd_prod_selected_size(event.target.value)
    //console.log(event.target.value)
    
  }

  return (
    <div>
      <TopBanner />
      <NavBar />
      <HeroImage />
 
      
 <div className="container-product-details">
      <div className="row">
        <div className="col-lg-7">
          <img
            className="card-img-top"
            src={
              ProductData.photo}
            alt={ProductData.photo}
          />
          <div
            className=
                 "product-details-banner-new"
                      
          >
            New
          </div>
          <div className={bannerStockLevel}>{stockLevelMessage}</div>
        </div>
        <div className="col-lg-5">
          <h1>{ProductData.title}</h1>

          {discount > 0 ? (
            <h2>
              <span className="product-price-after-discount">
                {
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ZAR",
                  }).format(
                    ProductData.price -
                      (ProductData.price * discount / 100)
                  )
                  // Math.round(ProductDetails.price - (ProductDetails.price*ProductDetails.discount/100))
                }
              </span>{" "}
              <span className="product-price-before-discount">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "ZAR",
                }).format(ProductData.price)}
              </span>{" "}
              <span className="product-discount-rate">
                -{discount}%{" "}
              </span>
            </h2>
          ) : (
            <h2>
              {" "}
              <span className="product-price-whit-no-discount">
                
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "ZAR",
                }).format(ProductData.price)}
              </span>
            </h2>
          )}
          {/* <h2> R{ProductDetails.price} <span> R{ProductDetails.price}</span> <span> 50</span></h2> */}
          <h3>Brand: {ProductData.marque}</h3>
          <h3>Type: {ProductData.type}</h3>
         
          <h3>Size: {prod_selected_size}</h3>
        
          {/* <div className="mb-4 mt-4">{product_size}</div> */}
          <h3>QTY:{ProductData.quantite}</h3>
          <div className="def-number-input number-input">
          <button onClick={()=>decrease()} className="minus"></button>
          <input className="quantity" name="quantity" value={count} 
          type="number" />
          <button onClick={()=>increase(ProductData.quantite)} className="plus"></button>
        </div>

          <h3>Product Details:</h3>

          <div className="mb-4 mt-4">{ProductData.body}</div>
          <div className="row product-details-services">
            <div className="col-lg-4">
              <FontAwesomeIcon
                icon={faPlaneDeparture}
                className="product-details-services-icons"
              />
              
                <h2>User Posted By:</h2>
         
          <div className="container ">
          <div class="content_card">
          <div class="avatar_holder">
          <Link to={`/userprofile/${postedBy._id}`}>
            <img
              class="avatar"
              alt={postedBy.photo}
              src={postedBy.photo}
            />
            <h1>  Name   : </h1><h6>{postedBy.name} {postedBy.lastname}</h6>
            </Link>
          </div>
        </div>
        
        
          </div>
          
              <h4>SHIPS WITHIN HOURS</h4>
            </div>
            <div className="col-lg-4">
              <FontAwesomeIcon
                icon={faRedoAlt}
                className="product-details-services-icons"
              />
              <h4>EASY RETRUNS</h4>
            </div>

            <div className="col-lg-4">
              <FontAwesomeIcon
                icon={faCommentDots}
                className="product-details-services-icons"
              />
              <h4>24/7 CUSTOMER SERVICE</h4>
            </div>
          </div>

          {/* {
            product_display_mode ==="action_edit" 
            ?
            <h2> Editing product </h2>
            : 
            <h2> Viewing product </h2>
          }
         */}
          {ProductData.quantite === 0 ? (
            <h2 className="out-of-stock-notice">
              <FontAwesomeIcon icon={faChartBar} /> Out of Stock
            </h2>
          ) : (
           <div >
         
            <button className="product-btn-add-to-cart shadow-none "
         onClick={ () => handleAddToCart(ProductData)}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                className="product-btn-add-to-cart-icon"
              />
              Add to Cart
            
            </button>
     <br></br>
     <br></br>
            <button className="product-btn-add-to-cart shadow-none "
           onClick={()=>setShowModalOption(true)}
            >
              
              <FontAwesomeIcon
                icon={faLink}
                className="product-btn-add-to-cart-icon"
              />
     Send Product
            
            </button>
            </div>
          )}
          {
                          showModalOption &&
                          <Modal click={()=>setShowModalOption(false)} >
                              <Fragment key="header">
                               <h3 className="m-0">Product</h3>
                              </Fragment>
                              <Fragment key="body">
                          
                            <div className="form-group">
              <label htmlFor="username">  Product Link : </label>
              <input type="text" name="username" value={window.location.href} />
              <button className="product-btn-add-to-cart shadow-none "
              onClick={() => {navigator.clipboard.writeText(window.location.href)}} >
<FontAwesomeIcon
  icon={faPaperclip}
  className="product-btn-add-to-cart-icon"
>
</FontAwesomeIcon>
Copy Link
              </button>
            </div>
            
            <button className="product-btn-add-to-cart shadow-none "
          onClick={()=>setdisplaySocialInputs(true)}
            >
              
              <FontAwesomeIcon
                icon={faEnvelope}
                className="product-btn-add-to-cart-icon" 
              />
     Send Product by Mail
            
            </button>
            
            {displaySocialInputs &&
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                        Email:    <input type="text" placeholder="email" name="twitter"  onChange={e=> setEmail(e.target.value)}/>
                        </div>

                        <button className="product-btn-add-to-cart shadow-none "
          onClick={()=>sendMail(mail)}
            >
              
              <FontAwesomeIcon
                icon={faEnvelope}
                className="product-btn-add-to-cart-icon" 
               
              />
     Send Mail
            
            </button>

                    </Fragment>}
                              </Fragment>
                              <Fragment key="footer">
                             
                              </Fragment>
                          </Modal>
                        }
        </div>
      </div>
    </div>
      <Footer />
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
    fetchPost:(id)=>dispatch(post(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Catalog)
