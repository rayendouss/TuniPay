import React,{useEffect, useState} from "react";
import data from "../data/Allproducts.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.scss";
import Product from "./Product";
import Modal from '@mui/material/Modal';
import { useSelector,useDispatch,connect } from "react-redux";
import Button from '@mui/material/Button';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import SendIcon from '@mui/icons-material/Send';
import { Grid, Tooltip, Fab } from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import { fetchPosts,recherchePost ,notifPosts} from "../store/actions/post";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  Typography  from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import { CardContent } from "@mui/material";
import { Route, useParams } from "react-router-dom";
import {  useToasts } from 'react-toast-notifications';

import { SettingsSystemDaydreamSharp } from "@mui/icons-material";
 function Products() {
   
  const { addToast } = useToasts();
  const [ProductData,setProductData]=useState([]);
 const  [open,setOpen]=useState(false)
 const [tri, setTri] = useState('');
 const [taille,setTaille] = useState()
 const [marqueV,setmarqueV]=useState()
 const [value, setValue] = React.useState([0, 500]);
 const [valueq, setValueq] = React.useState([0, 40]);
 const [tri2, setTri2] = useState('');
 const [taille2,setTaille2] = useState()
 const [marqueV2,setmarqueV2]=useState()
 const [value2, setValue2] = React.useState([0, 500]);
 const [valueq2, setValueq2] = React.useState([0, 40]);
  const[changed,setchanged] =useState(false)
  const [typepr,setTypepr]=useState()
 const marque=[
  { label: 'PALM ANGELS', year: 1994 },
  { label: 'AIR JORDAN', year: 1994 },
  { label: 'PRADA', year: 1994 },
  { label: 'DIOR', year: 1994 },
  { label: 'HERMES', year: 1994 },
  { label: 'PULL AND BEAR JEANS', year: 1994 },
  { label: 'NIKE', year: 1994 },
  { label: 'CHANEL', year: 1994 },
  { label: 'CONVERSE', year: 1994 },
  { label: 'DSQUARED2', year: 1994 },
  { label: 'OFF WHITE', year: 1994 },
  { label: 'LE TEMPS DES CERISES', year: 1994 },
  { label: 'LOUIS VUITTON', year: 1994 },
  { label: 'CALVIN KLEIN', year: 1994 },
  { label: 'TOMMY HILFIGER', year: 1994 },
  { label: 'LACOSTE', year: 1994 },
  { label: 'RALPH LAUREN', year: 1994 },
  { label: 'THE NORTH FACE', year: 1994 },
  { label: 'MONCLER', year: 1994 },
  { label: 'VALENTINO', year: 1994 },
  { label: 'BERSHKA', year: 1994 },
  { label: 'MANGO', year: 1994 },
  { label: 'HOLLISTER', year: 1994 },
  { label: 'BURBERRY', year: 1994 },
  { label: 'JACK & JONES', year: 1994 },
  { label: 'STONE ISLAND', year: 1994 },
  { label: 'ADIDAS', year: 1994 },
  { label: 'PUMA', year: 1994 },
  { label: 'ANTONY MORATO', year: 1994 },
  { label: 'BENETTON', year: 1994 },
  { label: 'C&A', year: 1994 },
  { label: 'CELIO', year: 1994 },
  { label: 'DIESEL', year: 1994 },
  { label: 'EDEN PARK', year: 1994 },
  { label: 'HAMADI ABID', year: 1994 },
  { label: 'FRED PERRY', year: 1994 },
  { label: 'G-STAR', year: 1994 },
  { label: 'GANT', year: 1994 },
  { label: 'GAP', year: 1994 },
  { label: 'HACKETT', year: 1994 },
  { label: 'H&M', year: 1994 },
  { label: 'HUGO BOSS', year: 1994 },
  { label: 'JULES', year: 1994 },
  { label: 'LE COQ SPORTIF', year: 1994 },
  { label: "LEVI'S", year: 1994 },
  { label: 'NEW BALANCE', year: 1994 },
  { label: 'REEBOOK', year: 1994 },
  { label: 'REDSKINS', year: 1994 },
  { label: 'SCOTHCH & SODA', year: 1994 },
 ]
 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const handleClose = () => setOpen(false);
 let { collectionname } = useParams();

 useEffect(()=>{
console.log('collectionname',collectionname)
  if(collectionname==undefined){
    setTypepr("all")
  }else{
    setTypepr(collectionname)
  }
 },[collectionname])

  const handleChangeprix = (event, newValue) => {
    console.log('prix',newValue)
    setchanged(true)
    setValue(newValue);
  };
  const handleChangeprix2 = (event, newValue) => {
    console.log('prix',newValue)
   
    setValue2(newValue);
  };
  const handleChangeq = (event, newValue) => {
    console.log('quantite',newValue)
    setchanged(true)
    setValueq(newValue);
  };
  const handleChange = (event) => {
    console.log(event.target.value)
    setchanged(true)
    setTri(event.target.value);
  };
  const handleChangeT = (event) => {
    console.log("taille",event.target.value)
    setchanged(true)
    setTaille(event.target.value);
  };

  const handleChangeq2 = (event, newValue) => {
    console.log('quantite',newValue)
  
    setValueq2(newValue);
  };
 
  const handleChangeT2 = (event) => {
    console.log("taille",event.target.value)
    
    setTaille2(event.target.value);
  };
  
function valuetext(value) {
  return `${value}`;
}
function valuetextq(value) {
  return `${value}`;
}
function appliquerrecherche2(){
 
 const user = JSON.parse(localStorage.getItem('user'))
var ide=user._id
var email=user.email
 
  
  notifPosts({marqueV2,taille2,value2,valueq2,ide,email})
  .then(res=>{
  if(res.data.msg){
    console.log('3awed',res.data.msg)
    addToast("Alerte existe déja ",{appearance:"error",autoDismissTimeout :2000})
  }else{
    console.log('t3ada',res.data.msge)
    setOpen(false)
    addToast("Alerte ajoutée ",{appearance:"success",autoDismissTimeout :2000})
  }
  })
}
function appliquerrecherche(){
  
  const body={
    tri,marqueV,taille,value,valueq
  }
  recherchePost({tri,marqueV,taille,value,valueq}).then(res=>{
    
    setProductData(res.data.post)
  })
  

}
function openmodalAlerte(){
   setOpen(!open)
}


useEffect(()=>{ 
  console.log('typepr',typepr)
  fetchPosts(typepr)
  .then(res=>{
      setProductData(res.data.posts)
    
  })},[typepr])
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
      
      <div  className="header-products">
      <div >
      <Typography sx={{ fontSize: 20 ,marginLeft:"40px",fontWeight:"bold"}} >
      Critère de recherche
        </Typography>
        <Card className="container" style={{display:"flex",justifyContent:"space-evenly",width:"150%",height: "120px"}}>
      
      
     
      <Box style={{marginTop:"40px"}}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Tri</InputLabel>
        <Select
        style={{width:"150px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tri}
          label="tri"
          onChange={handleChange}
        >
          <MenuItem value={1}>Prix croissant</MenuItem>
          <MenuItem value={2}>Prix décroissant</MenuItem>
          <MenuItem value={3}>Plus récentes</MenuItem>
          <MenuItem value={4}>Plus anciennes</MenuItem>
          <MenuItem value={5}>Promos %</MenuItem>
         
        </Select>
      </FormControl>
      </Box>
      <Box style={{marginTop:"40px"}}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Taille</InputLabel>
        <Select
        style={{width:"150px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taille}
          label="tri"
          onChange={handleChangeT}
        >
           <MenuItem value={0}>Taille XS</MenuItem>
          <MenuItem value={1}>Taille S</MenuItem>
          <MenuItem value={2}>Taille M</MenuItem>
          <MenuItem value={3}>Taille L</MenuItem>
          <MenuItem value={4}>Taille XL</MenuItem>
          <MenuItem value={5}>Taille XXL</MenuItem>
         
        </Select>
      </FormControl>
      </Box>
      <Box style={{marginTop:"40px"}}>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={marque}
      sx={{ width: 200 }}
      value={marqueV}
      onChange={(event, value) => setmarqueV(value.label)  }
      renderInput={(params) => <TextField {...params} label="Marque" />}
    />
      </Box>
      <Box style={{width:"150px",marginTop:"40px"}}>
      <Typography id="range-slider" >
        Prix
      </Typography>
      <Slider
        value={value}
        onChange={handleChangeprix}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={0}
        max={500}
      />
     </Box>
     <Box style={{width:"150px",marginTop:"40px"}}>
      <Typography id="range-slider" >
        Quantite
      </Typography>
      <Slider
        value={valueq}
        onChange={handleChangeq}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetextq}
        min={0}
        max={40}
      />
     </Box>
     <Box style={{width:"140px",marginTop:"50px"}}>
     <Button variant="contained" endIcon={<SendIcon />} onClick={()=>appliquerrecherche()}>
        Appliquer
      </Button>
  
     
       <Tooltip title="Gérer votre propre alerte" fontSize={100}>
      <AddAlertIcon style={{marginLeft:"10px"}} color="primary" fontSize="large" onClick={()=>openmodalAlerte()} />
      </Tooltip>
     
      </Box>
      
     </Card>
  
    </div>
        <h1>
        
        All Products
        </h1>
      </div>

      <div className="row" id="products">
        {ProductData.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{marginLeft:"40%"}}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Be the first to see new products 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
      <Box>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Taille</InputLabel>
        <Select
      style={{width:"200px",marginTop:"10px"}}
      
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taille2}
          label="tri"
          onChange={handleChangeT2}
        >
           <MenuItem value={0}>Taille XS</MenuItem>
          <MenuItem value={1}>Taille S</MenuItem>
          <MenuItem value={2}>Taille M</MenuItem>
          <MenuItem value={3}>Taille L</MenuItem>
          <MenuItem value={4}>Taille XL</MenuItem>
          <MenuItem value={5}>Taille XXL</MenuItem>
         
        </Select>
      </FormControl>
      </Box>
      <Box >
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={marque}
      sx={{ width: 200,marginTop:"10px" }}
      value={marqueV2}
      onChange={(event, value) => setmarqueV2(value.label)  }
      renderInput={(params) => <TextField {...params} label="Marque" />}
    />
      </Box>
      <Box >
      <Typography id="range-slider" >
        Prix
      </Typography>
      <Slider
      sx={{ width: 200,marginTop:"10px" }}
        value={value2}
        onChange={handleChangeprix2}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={0}
        max={500}
      />
     </Box>
     <Box >
      <Typography id="range-slider" >
        Quantite
      </Typography>
      <Slider
      sx={{ width: 200,marginTop:"10px" }}
        value={valueq2}
        onChange={handleChangeq2}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetextq}
        min={0}
        max={40}
      />
     </Box>
          </Typography>
          <Button variant="contained" endIcon={<SendIcon />} onClick={()=>appliquerrecherche2()}>
        Appliquer
      </Button>
        </Box>
    
      </div>
      </Modal>
    </div>
   
 


  );
}
const mapStateToProps =(state) =>{
  return {
    user:state.authReducer.user
  }
}

export default connect(mapStateToProps)(Products);