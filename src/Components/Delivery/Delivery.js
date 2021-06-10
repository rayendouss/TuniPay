import React, { Suspense } from "react";
import "../../styles/Homepage.scss";



import "bootstrap/dist/css/bootstrap.min.css";
import {ToastProvider} from "react-toast-notifications";
import GoogleMap from "./GoogleMap"
import "./map.css"
const NavBar = React.lazy(() => import("../Navigation/NavBar"));
const Footer = React.lazy(() => import("../Navigation/Footer"));

const TopBanner = React.lazy(() => import("../Navigation/TopBanner"));


export default function () {
  return (
    <div >
     
<br />
<ToastProvider>
<GoogleMap /></ToastProvider>
<br />
     

    </div>
  );
}
