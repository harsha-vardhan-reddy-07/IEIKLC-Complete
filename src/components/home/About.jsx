import React, { useEffect } from 'react'
import {FaGraduationCap} from 'react-icons/fa';
import {TbTargetArrow} from 'react-icons/tb';
import '../../styles/About.css'
import IeiPic from '../../images/ieiPic.jpg'
import { collection, addDoc , query, where, getDocs, deleteDoc, doc,  getDoc, updateDoc  } from "firebase/firestore"; 
import {db } from '../../firebase'

const About = () => {

   // // Fetch data 

   const [members, setMembers] = React.useState([]);

   const fetchMembers = async () => {
     const q = query(collection(db, "authorities"));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       setMembers(members =>  [...members, {id: doc.id, data: doc.data()}]);
       console.log(doc.id)
     });
   }
 
   useEffect(() => {
 
     fetchMembers();
 
   }, []);

  return (
    <div className='about' >
      
      <div className="aboutPart1" id='AboutUs'>
        <h1>About Us</h1>
        <hr />
      </div>

      <div className='aboutBox'>
        <img src={IeiPic} alt="" />
        <div className="aboutBoxContent">
          <div className="aboutContentPara">
          <p>The Institution of Engineers, India (IEI) is a highly esteemed professional organization with a rich history and a strong commitment to the advancement of engineering in India. One of its prominent branches, the Kadapa Local Center, plays a vital role in serving the needs of engineers, engineering students, and various stakeholders within the region.</p>
          <p>The Kadapa Local Center of IEI serves as a hub of knowledge and expertise for individuals interested in the field of engineering. It provides a platform for engineers from diverse backgrounds to come together, collaborate, and share their knowledge and experiences.</p>
          </div>
          <div className='aboutBoxIcons'>
            <div className="aboutIcon1">
              <TbTargetArrow />
              <p>Our vision</p>
            </div>
            <div className="aboutIcon2">
              <FaGraduationCap />
              <p>Hallmark Points</p>
            </div>
          </div>
        </div>
      </div>


      <div className="aboutPart2">
          <div className="aboutPart2Content">
            <div className="localAuthority">
              <div className="localAuthorityTitle">
                <hr id="hr1" />
                  <h1>Authorities of IEI KLC</h1>
                <hr id="hr2" />
              </div>
                
              {members.length> 0 ?
                  <div className="localAuthorityPersons">

                    {members.map((member, index)=>(

                      <div className="localPerson1" key={index}>
                        <img src={member.data.image} alt="" />
                          <h2>{member.data.name}, <span style={{fontSize: '0.7rem', fontWeight: '400'}} >{member.data.qualification}</span></h2>
                        <p>{member.data.designation}</p>
                      </div>
                    ))}

                  </div>
              : <p>Loading....</p>
              }
            </div>
          </div>

      </div>
    </div>
  
  )
}

export default About