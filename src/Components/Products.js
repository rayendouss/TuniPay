import React,{useState} from "react";
import data from "../data/Allproducts.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.scss";
import Product from "./Product";
import { useSelector,useDispatch,connect } from "react-redux";
import { fetchPosts } from "../store/actions/post";
 function Products({user,fetchPost}) {
  const [ProductData,setProductData]=useState([]);
  fetchPost()
  .then(res=>{
      setProductData(res.posts)
      console.log(ProductData)
  })
  /* const collectionname = props.collectionname;
  let products = [];
  let header_collection;

  switch (collectionname) {
    case "women":
      products = data.filter((product) => product.category === collectionname);
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "kids":
      products = data.filter((product) => product.category === collectionname);
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "men":
      products = data.filter((product) => product.category === collectionname);
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "Trending":
      products = data.filter(
        (product) => product.product_status === collectionname
      );
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    case "New":
      products = data.filter(
        (product) => product.product_status === collectionname
      );
      header_collection = "Collection: " + collectionname.toUpperCase();
      break;
    default:
      products = data;
      header_collection="Products list";
  } */

  return (
    <div className="container-products">
      <div className="header-products">
        <h1>
        
        All Products
        </h1>
      </div>

      <div className="row">
        {ProductData.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
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
    fetchPost:()=>dispatch(fetchPosts())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Products);