import React, { useEffect } from 'react'
import OtherNav from '../components/OtherNav'
import '../styles/Members.css'
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../firebase'

const Members = () => {

  
  // // Fetch data 

  const [members, setMembers] = React.useState([]);

  const fetchMembers = async () => {
    const q = query(collection(db, "members"));
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
    <div>
      <OtherNav />

      <div className="members_page">

          <div className="members_head">
            <h1>Members of IEI KLC</h1>
          </div>

            {members.length>0?
            
              <div className="members">

                  {members.map((member)=>(

                      <div className="member">
                        <img src={member.data.image} alt=""/>
                        <h3>{member.data.name}</h3>
                        <span>{member.data.designation}</span>
                      </div>
                  ))}
              </div>
            : <p>No members..</p>
            }


      </div>
    </div>
  )
}

export default Members