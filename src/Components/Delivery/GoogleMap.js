import React, { Component, useState,useRef } from 'react';
import { Map, TileLayer , Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./map.css"
import "./style.scss"
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,useDispatch } from "react-redux";
import { useHistory  } from "react-router-dom";
import axios from "axios"
import L from "leaflet"
import { faShoppingBasket, faEye } from "@fortawesome/free-solid-svg-icons";
import marker from "../../assets/images/marker.png"
import useGeoLocation from "./useGeoLocation"
import { AddCommande } from '../../store/actions/post'; 
const markerIcon = new L.icon({
  iconUrl: marker,
  iconSize: [35,45],
  iconAnchor: [17,46],
  popupAnchor: [0,-46]
})

const Maps=()=> {
  const user=useSelector(state=>state.authReducer.user)
  const [name,setName]=useState(user.name)
  const [email,setEmail]=useState(user.email)
  let history = useHistory();
  const dispatch=useDispatch()
  let listCommande=[]
  const submitForm=(e)=>{
    e.preventDefault()
   let paiement="livraison"
   let quantite=1
    listCommande=JSON.parse(localStorage.getItem("myShoppingCart"))
    listCommande.forEach(element => {
         
         dispatch(AddCommande({listCommande:element,paiement,quantite,address}))
       });

    
    
}
  const { addToast } = useToasts();
  const [address, setAddress] = useState(user.address);
      const [currentLocation,setCurrentLocation]=useState({ lat: 52.52437, lng: 13.41053 });
      const zoom=12 ;
      const mapRef=useRef()
    const location = useGeoLocation()
    const showMyLocation = () => {
      if(location.loaded&& !location.error) {
        console.log(location.coordinates.lat,location.coordinates.lng)
       setCurrentLocation({ lat:location.coordinates.lat,lng:location.coordinates.lng})
     axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+location.coordinates.lat+"&longitude="+location.coordinates.lng+"&localityLanguage=fr")
     .then(res => {
       console.log(res)
       setAddress(res.data.countryName +""+ res.data.principalSubdivision +""+ res.data.locality)
    })
      }else {
        alert(location.error.message)
      }
    }
    return (
      <div>
     
             <div className="base-container">
        <div className="header">Commande</div>
        <div className="content">
         
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Nom :</label>
              <input type="text" name="username" placeholder="username" onChange={e=>setName(e.target.value)}
                                      value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input type="text" name="email" placeholder="email"  onChange={e=>setEmail(e.target.value)}
                                      value={email} />
            </div>
          
          </div>
        </div>
      
    
 
      <Map  center={currentLocation} zoom={zoom} style={{width:"50%",height:"400px"}}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />       
     { location.loaded && !location.error && (
       <Marker 
       icon={markerIcon}
       position={[
         location.coordinates.lat,
         location.coordinates.lng
       ]}
       >

       </Marker>
     )

     }
      </Map>
    
      <button className="btn btn-primary" onClick={showMyLocation} >
        Locate Me
      </button>
      <div className="content">
         
         <div className="form">
           <div className="form-group">
             <label htmlFor="username">Address :</label>
             <input type="text" name="Address" placeholder="push to get your current position" onChange={e=>setAddress(e.target.value)} value={address}/>
           </div>
          
         
         </div>
       </div>
   
       <button className="btn btn-primary" style={{fontSize:"20px" , width:"300px"}} >
       <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>     <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight:"10px"}} />   Payer avec Compte Paymee </div>
      </button>
      <br></br>
      <button className="btn btn-primary"  style={{fontSize:"20px" , width:"300px"}} >
      <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>     <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight:"10px"}} />   Payer avec carte bancaire </div>
      </button>  
      <br></br>
      <button className="btn btn-primary" style={{fontSize:"20px" , width:"300px" }}  onClick={(e)=>submitForm(e)}> 
      <div style={{display:"flex", justifyContent:"start" ,alignItems:"center"}}>  <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight:"10px"}} />    Paiement à la livraison </div>
      </button>
      <br></br>  
      </div>   </div>
    );
    }
export default Maps;