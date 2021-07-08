import React, { Component ,useState,useEffect} from 'react';
import { Card, CardImg, CardText, Col,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import Grid from "@material-ui/core/Grid";
  import { useSelector,useDispatch,connect } from "react-redux";
  import { mycommande} from "../store/actions/post";
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
      <Grid item xs={4}>
     {
     MyCommandes.map((item)=>{
        return(
            <div>
          
              <div class="video_card">
      <div class="card-head">
        <div class="tag">Live</div>
      </div>
      <div class="card-body">
        <div class="content_card">
          <div class="avatar_holder">
            <img
              class="avatar"
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            />
          </div>
        </div>
        <div class="author">
          <div>
            <span>React Query 3 - CRUD Library Application</span>
          </div>
          <div>ghassen mansouri</div>
        </div>
      </div>
    </div> 
            </div> 
        )
     })
    }
     </Grid>
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