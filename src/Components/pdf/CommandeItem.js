import React , {useState,useContext,Fragment, useEffect} from "react";
import NavBar from "../Navigation/NavBar";
import Footer from "../Navigation/Footer";
import HeroImage from "../Navigation/HeroImage";
import {GlobalCartContext} from '../../context/CartContext';
import {useParams} from 'react-router-dom';



import { post } from "../../store/actions/post";
import TopBanner from "../Navigation/TopBanner";
import { connect } from "react-redux";
import "../../styles/ProductDetails.scss";
import {commandedetail,userDetail} from "../../store/actions/post"
import Modal from "../Modal/Modal"
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

import {  useToasts } from 'react-toast-notifications';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
 function CommandeItem({user,fetchPost}) {
  const [showModalOption,setShowModalOption]=useState(false)
  const [displaySocialInputs,setdisplaySocialInputs]=useState(false)
  const [mail,setEmail]=useState("")
  const [count,setCount]=useState(1)
  const {id,action} =useParams();
  const { addToast } = useToasts();
 const [display,setdisplay]=useState(false)

  const [listCommande,setlistCommande]=useState()
  const [UserD,setUserD]=useState()
  let selectedProduct = "";
  const [ProductData,setProductData]=useState([])

//   fetchPost(id)
 
//   .then(res=>{
 
    
 
//       setProductData(res.post)
   
//   })
useEffect(()=>{
    commandedetail(id).then(res=>{
        console.log('a',res.data.commande)
        setlistCommande(res.data.commande.listCommande)
        setProductData(res.data.commande)
        setdisplay(true)
    })
},[])


useEffect(()=>{
if(listCommande){
  userDetail(listCommande.postedBy).then(res=>{
console.log('res',res.data)
setUserD(res.data)
  })
}
},[listCommande])


 
  let discount =0
  let brand="not now"
  let color="not now"
  let bannerStockLevel = "";
  let stockLevelMessage = "";
  let productDescription = [];
 
 
if(display===true){  const productStockLevel = listCommande.quantite;
   if (productStockLevel > 0 && productStockLevel < 40) {
     bannerStockLevel = "product-details-banner-stock-level-low";
     stockLevelMessage = `Low stock, only ${productStockLevel} left.`;
   } else if (productStockLevel === 0) {
     bannerStockLevel = "product-details-banner-stock-level-out-of-stock";
     stockLevelMessage = `Out of  stock`;
   }}
   function sendMail(data) {
     setdisplaySocialInputs(false)
     addToast("mail envoyé à "+data,{appearance:"success"})
     console.log(data)
   }

   const {addItemTocart}= useContext(GlobalCartContext)
  
  function  handleAddToCart(data) {
   data.count=count
    addItemTocart(data);
    addToast(data.title+" has been saved for later shopping", { appearance: 'success', autoDismiss: true, })
  }

  const createPdf = (html) => Doc.createPdf(html);
  return (
    <div>
        
      <TopBanner />
      <NavBar />
      <HeroImage />
    
      
{ display ?
   <PdfContainer createPdf={createPdf}>
 <div className="container-product-details">
      <div className="row">
        <div className="col-lg-7">
      
          <img
            
            src={
              listCommande.photo}
            alt={listCommande.photo}
          />
          <div
            className=
                 "product-details-banner-new"
                      
          >
            {ProductData.status}
          </div>
          <div className={bannerStockLevel}>{stockLevelMessage}</div>
        </div>
        <div className="col-lg-5">
          <h1>{ProductData.title}</h1>

       
        
            <h2>
              {" "}
              <span className="product-price-whit-no-discount">
                
                {listCommande.price} DT  
              </span>
            </h2>
        
          {/* <h2> R{ProductDetails.price} <span> R{ProductDetails.price}</span> <span> 50</span></h2> */}
          <h3>Date de commande: {ProductData.DateC}</h3>

          <h3>Address: {ProductData.address}</h3>
          <h3>Size:</h3>
         
          {/* <div className="mb-4 mt-4">{product_size}</div> */}
          <h3>QTY:{ProductData.quantite}</h3>
      

          <h2>Product Details:</h2>
       
 
          <div className="container ">
          <div className="mb-4 mt-4"><h4>  Description   : </h4>{listCommande.body}</div>
          <div className="mb-4 mt-4">   <h4>    Title :</h4>{listCommande.title} </div>
          <div className="mb-4 mt-4">   <h4>  Max Qty :</h4>{listCommande.quantite}</div>
          <div className="mb-4 mt-4">   <h4>  Paiement :</h4>{ProductData.paiement}</div>
          </div>
          <h2>User Posted By:</h2>
         {UserD?
          <div className="container ">
          <div class="content_card">
          <div class="avatar_holder">
            <img
              class="avatar"
              alt={UserD.photo}
              src={UserD.photo}
            />
          </div>
        </div>
          <div className="mb-4 mt-4"><h4>  Name   : </h4>{UserD.name} {UserD.lastname}</div>
        
          </div>
        :""  
        }
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
    </PdfContainer>
:""    
}

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

export default connect(mapStateToProps,mapDispatchToProps)(CommandeItem)
