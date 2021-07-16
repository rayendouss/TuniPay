import React, { Component, useState,useRef ,Fragment} from 'react';
import { Map, TileLayer , Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from "../Modal/Modal"
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
  const [paymee, setPaymee] = useState(false);

  const [name,setName]=useState(user.name)
  const [email,setEmail]=useState(user.email)
  const[token,setToken]=useState()
  let history = useHistory();
  const { addToast } = useToasts();
  const dispatch=useDispatch()
  let listCommande=[]

  const submitPaymee=(e)=>{
    e.preventDefault()
   
   let paiement="paymee"
   let quantite=1
    listCommande=JSON.parse(localStorage.getItem("myShoppingCart"))
    listCommande.forEach(element => {
  
      let headers = {"Authorization": "Token 92586776dd80b338d247f0dfdd65bfe61306301f", "Content-Type":"application/json"}
      let dataa= {"vendor": 1746,
          "amount": Number(element.price),
          "note" : "Commande #1324"
      }
      axios.post(`https://sandbox.paymee.tn/api/v1/payments/create`,dataa,{headers})
      .then((res)=>{
        console.log(res.data.data)

        setToken(res.data.data.token)
        setPaymee(true)
        dispatch(AddCommande({listCommande:element,paiement,quantite,address}))
      })
     
       }); 
}

  const submitClicktopay=(e)=>{
    e.preventDefault()
   let paiement="bancaire"
   let quantite=1
    listCommande=JSON.parse(localStorage.getItem("myShoppingCart"))
    listCommande.forEach(element => {
      addToast("commande effectué", { appearance: 'success', autoDismiss: true, })
      axios.post("https://test.clictopay.com/payment/rest/register.do?userName=esprittest-api&password=89Lgnx9UE&orderNumber=54321043&amount="+Number(element.price)+"&returnUrl=http://localhost:3000/delivery").then
      ((result)=>{
        console.log("bb")
        console.log(result)
        dispatch(AddCommande({listCommande:element,paiement,quantite,address}))
        window.location.href = result.data.formUrl
      })
     
       }); 
}
  const submitForm=(e)=>{
    e.preventDefault()
   let paiement="livraison"
   let quantite=1
    listCommande=JSON.parse(localStorage.getItem("myShoppingCart"))
    listCommande.forEach(element => {
      console.log(element)
      addToast("commande effectué", { appearance: 'success', autoDismiss: true, })
         dispatch(AddCommande({listCommande:element,paiement,quantite,address})).then(
          
          ()=>history.push('/cart')
    )
       }); 
}
 
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
             <input type="text" name="Address" placeholder="push to get your current position" onChange={e=>setAddress(e.target.value)} value={address} required/>
           </div>
          
         
         </div>
       </div>
   
       <button className="btn btn-primary" style={{fontSize:"20px" , width:"300px"}} >
       <div style={{display:"flex",justifyContent:"start",alignItems:"center"}} onClick={(e)=>submitPaymee(e)}>     <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight:"10px"}} />   Payer avec Compte Paymee 
       
   
       </div>
      </button>

      { paymee &&
               <Modal click={()=> setPaymee(false)}>
                   <Fragment key="header">
                    Paymenet avec paymee
                   </Fragment >
                   <Fragment key="body">
                   <form method="post" action="https://sandbox.paymee.tn/gateway/">
<input type="hidden" name="payment_token" value={token} />
<input type="hidden" name="url_ok" value="https://example.com/ok.php"/>
<input type="hidden" name="url_ko" value="https://example.com/ko.php"/>
<button> <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight:"10px"}} />   Payer avec  Paymee</button>
</form>
                   </Fragment>
                   <Fragment key="footer">
                     
                   </Fragment>
               </Modal>
            }


      <br></br>
      <button className="btn btn-primary"  style={{fontSize:"20px" , width:"300px"}} onClick={(e)=>submitClicktopay(e)}>
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