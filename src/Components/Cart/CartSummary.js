import React,{useContext} from "react";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {GlobalCartContext} from '../../context/CartContext';
import '../../styles/Cartsummary.scss';
import { Link } from "react-router-dom";
export default function CartSummary(props) {
  const {myShoppingCart}=useContext(GlobalCartContext);
  const vat_percentage=1.15;
  let cartTotal=0;
 
  let amountSaved=0;
  myShoppingCart.map((product) => (
   
    cartTotal+=   parseInt(product.price)*product.quantite
     
    ))

    myShoppingCart.map((product) => (
   
      amountSaved +=  ( (parseInt(product.price)) * product.count)
       
      ))
  
      

    
   
    
  const estimatedShippingCost = 50;
  return (
    <div className="cart-items-summary">
      <h2>Cart summary</h2>
   



      
      <div className="row">
        <div className="col-lg-6">
          <h4>Total</h4>
        </div>
        <div className="col-lg-6">
          <h3 className="cart-summary-amount-align-center">
            <span className="product-price-after-discount">
             
                 {amountSaved}
              
            </span>
          </h3>
        </div>
      </div>
      <div className="row">
        <button className="btn-check-out" id="btnpay">
        <Link to="/delivery" className="btn btn-primary">
          <FontAwesomeIcon icon={faCreditCard} className="btn-check-out-icon" />
          CHECK OUT NOW
        </Link>
        </button>
      </div>
    </div>
  );
}
