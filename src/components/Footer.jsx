import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerTitle">
            <h2>Quick Links</h2>
            <hr />
        </div>
        <div className="footerLinks">
          <ul>

            <li ><a href="#ContactUs" >Contact Us</a></li>
            <li ><a href="#AboutUs" >About Us</a></li>
            <li ><a href="#Events" >Upcomming Events</a></li>
            
          </ul>
          <ul>
            
            <li ><a href="#Events" >Events & News</a></li>
            <li ><a href="#Amenities" >IEI kadapa life</a></li>
            <li ><a href="#" >Internships</a></li>

          </ul>
          <ul>

            <li ><a href="#ContactUs" >Address</a></li>
            <li ><a href="#AboutUs" >Committee members</a></li>
            <li ><a href="#AboutUs" >Our vision</a></li>
           
          </ul>
        </div>
        <div className="footerCopyRights">
          <hr />
          <p>&#169; 2024 IEI Kadapa </p>
        </div>
    </div>
  )
}

export default Footer