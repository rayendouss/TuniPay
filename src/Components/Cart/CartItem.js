import React, { useContext ,useState} from "react";
import { Link } from "react-router-dom";
import { GlobalCartContext } from "../../context/CartContext";
import {  useToasts } from 'react-toast-notifications';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import introJs from 'intro.js';
export default function CartItem(props) {
  const { addToast } = useToasts();
  let discount = 0
  let product_name = props.data.title
  const { removeItemFromCart, saveItemforLater } = useContext(
    GlobalCartContext
  );
  const [stepsEnabled,setstepsEnabled]=useState(true)
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
      element: '#image',
      intro: '<strong> Product picture </strong> <br> Cliquez pour voir les détails du produit',
      position: 'right',
     
    },  
    {
      element: '#desc',
      intro: '<strong> Product description </strong> <br> les caractéristiques du produit ',
      position: 'right',
     
    },
  
    {
      element: '#remove',
      intro: '<strong> Delete product </strong> <br>Effacer le produit du panier ',
      position: 'right',
     
    },
    {
      element: '#save',
      intro: '<strong> Save product </strong> <br>Sauvegarder le produit pour le prochain achats ',
      position: 'right',
     
    },
    {
      element: '#edit',
      intro: '<strong> Edit product </strong> <br>Modifier le choix de votre quantité ',
      position: 'right',
     
    },
    {
      element: '#cart',
      intro: '<strong> Cart Summary </strong> <br>La liste des produits avec le prix total ',
      position: 'right',
     
    },
    {
      element: '#btnpay',
      intro: '<strong> Pay </strong> <br>Cliquez pour passer au page de paiements  ',
      position: 'right',
     
    },
    
  
   
  
  ]}
  function removeFromCart(_id) {
    console.log(_id)
    removeItemFromCart(_id);
    addToast(props.data.title+" successfully removed from your cart", { appearance: 'info', autoDismiss: true, })
   
  }

  function saveForLater(data) {
    const savedItem = {
      productname: data.productname,
      id: data.id,
      cartItemId:data.cartItemId,
      price: data.price,
      discount: data.discount,
      color: data.color,
      size: data.size,
      selectedSize: data.selected_size,
      product_status: data.product_status,
      product_stock: data.product_stock,
      product_selected_qty: data.product_selected_qty,
      product_image: data.product_image,
      brand: data.brand,

      product_details: data.product_details,
    };
    saveItemforLater(savedItem);
    removeItemFromCart(data.cartItemId);
    addToast(props.data.productname+" has been saved for later shopping", { appearance: 'success', autoDismiss: true, })
   
  }
  return (
    <>
      <tr className="row-cart-item ">
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
        <td className="row-cart-item-image-container">
          <div className="row-cart-item-image" id="image">
            <Link
              to={`/catalog/item/${props.data._id}/${props.data.title}/view`}
            >
              <img
                className="card-img-top"
                src={
                  props.data.photo}
                alt={props.data.photo}
              />
            </Link>
          </div>
        </td>
        <td className="row-cart-item-description-container">
          <div className="row-cart-item-description" id="desc">
            <Link
              className="cat-item-link-product-details"
              to={`/catalog/item/${props.data._id}/${props.data.title}/view`}
            >
              <h2 className="product-name">{props.data.title}</h2>
            </Link>
            <h3 className="product-size">Size: </h3>
            <h3 className="product-color">Color: </h3>
            <h3 className="product-color">MAX QTY: {props.data.quantite}</h3>
            <h3 className="product-color">QTY ADDED: {props.data.count}</h3>
            <h3 className="product-color">Price: {props.data.price}</h3>
          
            <button id="remove"
              className="btn-cart-item-action-remove"
              onClick={() => removeFromCart(props.data._id)}
            >
              Remove
            </button>
            <button id="save"
              className="btn-cart-item-action-save-edit"
              onClick={() => saveForLater(props.data)}
            >
              Save for later
            </button>

            <Link
              to={
                `/catalog/item/${props.data._id}/${product_name}/edit`
                  

                
              }
            >
              <button id="edit" className="btn-cart-item-action-save-edit">Edit</button>
            </Link>
          </div>
        </td>
        <td className="row-cart-item-price-container">
          <div className="row-cart-item-price">
            {/* <h3 className="product-prices"></h3> */}
            {props.data.discount > 0 ? (
              <h3>
                {" "}
                <span className="product-price-after-discount">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ZAR",
                  }).format(
                    (props.data.price * props.data.quantite)-
                      ((props.data.price *props.data.product_selected_qty) *100) / 100
                  )}
                </span>{" "}
                <span className="product-price-before-discount">
                  {" "}
                  {
                    /* R{props.data.price} */
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "ZAR",
                    }).format(parseInt(props.data.price)*props.data.quantite)
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
                   parseInt(props.data.price) * parseInt(props.data.count)
                  } DT
                </span>
              </h3>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
