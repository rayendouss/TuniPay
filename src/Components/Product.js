import React,{useContext} from "react";
import { faCartPlus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {GlobalCartContext} from '../context/CartContext';
import {  useToasts } from 'react-toast-notifications';
import {v4 as uuidv4} from 'uuid';
import "../styles/Product.scss";



export default function Product(props) {
  const { addToast } = useToasts();
  
  
  const {addItemTocart}= useContext(GlobalCartContext)
  
  function  handleAddToCart(data) {
   
    
    const newCartItem={
      productname: data.productname,
      cartItemId: uuidv4(),
      id: data.id,
      price: data.price,
      discount: data.discount,
      color: data.color,
      size: data.size,
      selectedSize:data.size[0],
      product_status: data.product_status,
      product_stock: data.product_stock,
      product_selected_qty:1,
      product_image: data.product_image,
      brand: data.brand,
  
      product_details: data.product_details


    }
    addItemTocart(newCartItem);
    addToast(data.productname+" successfully added to your cart", { appearance: 'success', autoDismiss: true, })
   
  }
  
  const productLevel = props.data.quantite;
  let bannerStockLevel = "";
  let stockLevelMessage = "";
  let discount =0
  let product_name = props.data.title.replace(/ /g, "_");
  
  if (productLevel > 0 && productLevel < 40) {
    bannerStockLevel = "product-banner-stock-level-low";
    stockLevelMessage = `Low stock, only ${productLevel} left.`;
  } else if (productLevel === 0) {
    bannerStockLevel = "product-banner-stock-level-out-of-stock";
    stockLevelMessage = `Out of  stock`;
  }
  
 
  return (
    <div className="col-lg-3 col-md-4 col-sm-6  col-product-container">
      <div className="card-product">
        <img
          className="card-img-top"
          src={props.data.photo}
          alt={props.data.photo}
        />

        <div
          className= 
              "product-banner-new"
             
        
        >
         New
        </div>
        <div className={bannerStockLevel}>{stockLevelMessage}</div>
        <div className="card-body">
          <h2 className="card-title">
            {props.data.title}</h2>
          <div className="row">
            <div className="col-lg-7  col-md-6 col-sm-6">
              {discount > 0 ? (
                <h3>
                  {" "}
                  <span className="product-price-after-discount">
                    
                    {
                      
                    new Intl.NumberFormat('en-US', {style: 'currency', currency:'ZAR'}).format( props.data.price -  (props.data.price * discount / 100)
                    )
                  
                  }
                  </span>{" "}
                  <span className="product-price-before-discount">
                    {" "}
                    {
                 
                    new Intl.NumberFormat('en-US', {style: 'currency', currency:'ZAR'}).format(  props.data.price) 
                    }
                           
                  </span>{" "}
                  <span className="product-discount-rate">
                    -{discount}%{" "}
                  </span>
                </h3>
              ) : (
                <h3>
                  {" "}
                  <span className="product-price-whit-no-discount">
                    {
                 
                    new Intl.NumberFormat('en-US', {style: 'currency', currency:'ZAR'}).format(  props.data.price) 
                    }
                  </span>
                </h3>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 ">
              <div className="card-product-action-icons">
                {props.data.quantite >=1 ?
                <span
                  name="id"
                  value={props.data._id}
                  className="card-product-action-cart-icon add-to-cart-icon"
                  
                  onClick={ () => handleAddToCart(props.data)}
                >
         
                  <FontAwesomeIcon 
                  icon={faCartPlus}
                 
                   />
                </span>
                :""}

                <span>
                  <a
                    href={`/catalog/item/${props.data._id}/${product_name}/view`}
                    className="card-product-action-cart-icon"
                  >
                    <FontAwesomeIcon icon={faSearchPlus} />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
