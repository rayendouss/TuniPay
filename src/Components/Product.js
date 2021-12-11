import React,{useContext,useState} from "react";
import { faCartPlus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {GlobalCartContext} from '../context/CartContext';
import {  useToasts } from 'react-toast-notifications';
import {v4 as uuidv4} from 'uuid';
import "../styles/Product.scss";
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import introJs from 'intro.js';


export default function Product(props) {
  const { addToast } = useToasts();
  const [stepsEnabled,setstepsEnabled]=useState(true)
  
  const {addItemTocart}= useContext(GlobalCartContext)
  
  function  handleAddToCart(data) {
   
    
  
    addItemTocart(data);
    addToast(data.title+" successfully added to your cart", { appearance: 'success', autoDismiss: true, })
   
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
      element: '#products',
      intro: '<strong> Liste of products </strong> <br> Liste des produits',
      position: 'right',
     
    },
    {
      element: '#photo',
      intro: '<strong> Product picture </strong> <br> La photo de produit',
      position: 'right',
     
    },
    {
      element: '#stock',
      intro: '<strong> Stock </strong> <br> Nombre de produit disponible',
      position: 'right',
     
    },
    {
      element: '#title',
      intro: '<strong>Product title </strong> <br>Titre du produit',
      position: 'right',
     
    },
    {
      element: '#price',
      intro: '<strong> Product price  </strong> <br> Prix du produit',
      position: 'right',
     
    },
    {
      element: '#detail',
      intro: '<strong> Product details </strong> <br> Voir les details du produit',
      position: 'right',
     
    },
    {
      element: '#pan',
      intro: '<strong>Add product </strong> <br> Ajouter le produit au panier',
      position: 'right',
     
    }
  ]}
  return (
    <div className="col-lg-3 col-md-4 col-sm-6  col-product-container" >
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
      <div className="card-product">
        <img
        id="photo"
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
        <div id="stock" className={bannerStockLevel}>{stockLevelMessage}</div>
        <div className="card-body">
   
          <div className="container">
          <h2 className="card-title" id="title">
            <br></br>
         Title:   {props.data.title}</h2>
          <div >
            <div id="price">
              
                <h3  >
                 
                 Price :  {
                   props.data.price 
                    } 

                 
                </h3>
              
            </div>
          
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-6 ">
              <div className="card-product-action-icons">
                {props.data.quantite >=1 ?
                <span
                  name="id"
                  id="pan"
                  value={props.data._id}
                  className="card-product-action-cart-icon add-to-cart-icon"
                  
                  onClick={ () => handleAddToCart(props.data)}
                >
         
                  <FontAwesomeIcon 
                  icon={faCartPlus}
                 
                   />
                </span>
                :""}
<br></br>
<br></br>


                <span id="detail">
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

  );
}
