import React, { Component ,useState,useEffect} from 'react';
import { Card, CardImg, CardText, Col,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import Grid from "@material-ui/core/Grid";
  import { useSelector,useDispatch,connect } from "react-redux";
  import { mycommande} from "../store/actions/post";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import "./VideoCard.css";
const Commandes =({myCmd})=> {
    const [MyCommandes,setMyCommandes]=useState([])
    useEffect(()=>{
       myCmd().then((res)=>{
         
         setMyCommandes(res.result)
        
       }
  
       )
    },[])
   
    return (
      <div class="rightside">
      <Grid container spacing={2}>
     {
     MyCommandes.map((item)=>{
        return(
            <div>
          
      <Grid item xs={4}>
              <div class="video_card">
      <div class="card-head" style={{backgroundImage:`url(${item.listCommande.photo})`}}>
        <div class="tag">{item.status}</div>
      </div>
      <div class="card-body">
        <div class="content_card">
          <div class="avatar_holder">
            <img
              class="avatar"
              alt={item.commandeBy.photo}
              src={item.commandeBy.photo}
            />
          </div>
        </div>
        <div class="author">
          <div>
            <span>{item.listCommande.title}</span>
          </div>
          <div>{item.commandeBy.name} {item.commandeBy.lastname}</div>
        </div>
    <div style={{marginLeft:"280px"}}>    <span className="card-product-cart-icon" >
                 
                 <FontAwesomeIcon icon={faTrash} />
               
             </span> </div>
      </div>
    </div> 
   
    </Grid>
            </div> 
        )
     })
    }
   </Grid>
            </div>
    )
  }

  const mapStateToProps =(state) =>{
    return {
     
      cmnds:state.postReducer.commandes
    }
  }
  const mapDispatchToProps=dispatch=> {
    return {
    
      myCmd:()=>dispatch(mycommande())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Commandes);