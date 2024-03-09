import React, { useEffect, useState } from 'react';
import {HiOutlineMenu} from 'react-icons/hi';
import {RxCross2} from 'react-icons/rx';
import ieiLogo from '../images/iei-logo.png';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const OtherNav = () => {
    const navigate = useNavigate();

    const [toggler, setToggler] = useState(true);
      
      const [navOptionsStyle, setNavOptionsStyle] = useState({});
  
  
      useEffect(() =>{
          if (window.screen.width < 801){
          if (toggler){
              setNavOptionsStyle({
                  right : '-100vw'
              });
          }
          else{
              setNavOptionsStyle({
                  right : '1vh'
              });
          }
      }
      },[toggler]);
  
    return (
      <div className='navbar' >
          <div className="navbarLogo">
            <img src={ieiLogo} alt=""/>
            <div className='navbarLogoText'>
              <h1>IEI</h1>
              <p >Kadapa</p>
            </div>
          </div>
  
          <div className="toggle">
              {toggler ? <HiOutlineMenu id='toggleMenu' onClick={() => setToggler(!toggler)} /> : <RxCross2 id='toggleX' onClick={() => setToggler(!toggler)} />} 
              
          </div>
  
          <div className="navOptions" style={navOptionsStyle}>
            <ul >
              <li onClick={()=>navigate("/#Home")} >Home</li>
              <li onClick={()=>navigate("/#AboutUs")} >About</li>
              <li onClick={()=>navigate("/#Events")} >Events</li>
              <li onClick={()=>navigate("/members")} >Members</li>
              <li onClick={()=>navigate("/admin")} >Admin</li>
            </ul>
          </div>
          
      </div>
    )
  }
  

export default OtherNav