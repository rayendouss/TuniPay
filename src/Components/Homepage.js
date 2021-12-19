import React, { Suspense ,useEffect} from "react";
import "../styles/Homepage.scss";
import { useSelector,useDispatch } from "react-redux";
import useHotjar from 'react-use-hotjar';

import "bootstrap/dist/css/bootstrap.min.css";
import loadingIcon from "../assets/images/dashboardloader3.gif";
import { fetchPosts } from "../store/actions/post";
const NavBar = React.lazy(() => import("./Navigation/NavBar"));
const Footer = React.lazy(() => import("./Navigation/Footer"));
const SecondaryIntro = React.lazy(() => import("./Intro/SecondaryIntro"));
const ProductCategories = React.lazy(() => import("./ProductCategories"));
const PopularProducts = React.lazy(() => import("./PopularProducts"));
const TopBanner = React.lazy(() => import("./Navigation/TopBanner"));
const HeroText = React.lazy(() => import("./Navigation/HeroText"));

export default function () {
  const user=useSelector(state=>state.authReducer.user)

   const dispatch = useDispatch()
   const myCustomLogger = console.log;
   const { initHotjar,identifyHotjar } = useHotjar();
   useEffect(()=>{

     initHotjar(2754261, 6, false, myCustomLogger);
     identifyHotjar(localStorage.getItem('user')._id,  localStorage.getItem('user'), myCustomLogger);
   },[initHotjar])
   
   useEffect(()=>{
     dispatch(fetchPosts()).then(res => console.log(res))
   },[dispatch])
    return (
    <div>
      <Suspense
        fallback={
          <img src={loadingIcon} alt="loading" className="loadingIcon" />
        }
      >
       
        <TopBanner />
        <NavBar />
      
        <HeroText />
        <p> welcome {user.name } </p>
        <SecondaryIntro />

        <ProductCategories />

        <PopularProducts />

        <Footer />
      </Suspense>
    </div>
  );
}
