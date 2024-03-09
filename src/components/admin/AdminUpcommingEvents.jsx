import React, { useEffect } from 'react'
import { FaRegHandPointRight } from 'react-icons/fa'
import Button from 'react-bootstrap/Button';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'

const AdminUpcommingEvents = () => {

  const [isVisible, setIsVisible] = React.useState(false);

  const [isUploading, setIsUploading] = React.useState(false);

  const [event, setEvent] = React.useState('');

  const uploadData = async() => {

    try{

      setIsUploading(true)

      const docRef = await addDoc(collection(db, "upcommeingEvents"), {
        event: event
      });

      setIsUploading(false);
      setIsVisible(false);

      console.log("Document uploaded");
      alert("New event uploaded");
      setEvent("");
      fetchEvents();

    }catch(e){
      alert("Error adding document: ");
      console.error("Error adding document: ", e);
    }
  }


  const [events, setEvents] = React.useState([]);

  const fetchEvents = async () => {
    const q = query(collection(db, "upcommeingEvents"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEvents(events =>  [...events, {id: doc.id, data:  doc.data()}]);
      console.log(doc.data())
    });
  }

  useEffect(() => {

    fetchEvents();

  }, []);


  
  // Delete image

  const deleteEvent = async (id) => {
    try{

      await deleteDoc(doc(db, "upcommeingEvents", `${id}`));
      alert("event deleted");
      setEvents([]);
      fetchEvents();
    }catch(e){
      alert("Error deleting event: ");
      console.error("Error deleting document: ", e);
    }

  }


  return (
    <div className='admin_upcommingEvents'>

      <span>
        <h3>Future Events</h3>
        <Button variant="primary" onClick={()=> setIsVisible(true)}>Add Event</Button>
      </span>

        {isVisible &&

        <div className="newBannerImg">
            <input type="text" placeholder="New Event" onChange={(e)=> setEvent(e.target.value)} value={event} />
            <span>
                {isUploading ?
                      <Button variant="success" disabled>Uploading...</Button>
                    :
                      <Button variant="success" onClick={uploadData} >Upload</Button>
                    
                }
            </span>
        </div>
        }

        {events.length > 0 ?
        
            <div className='admin_upcommingEventsList'>

                {events.reverse().map((event, index) => (
                  <span key={index}>
                      <FaRegHandPointRight className='upcommingEventIcon' />
                      <p>{event.data.event}</p>
                      <MdOutlineDeleteOutline className='delete_icon' onClick={()=>deleteEvent(event.id)} />
                  </span>
                ))} 
                    
            </div>
        :
            <p>No events to show</p>
        }

            
    </div>
  )
}

export default AdminUpcommingEvents