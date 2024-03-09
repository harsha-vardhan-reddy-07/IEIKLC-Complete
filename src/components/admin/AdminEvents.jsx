import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'
 

const AdminEvents = () => {

  const [isVisible, setIsVisible] = React.useState(false);

  const [isUploading, setIsUploading] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [description, setDescription] = React.useState('');
 

  const storage = getStorage();
  const storageRef = ref(storage, uuidv4());
  
  


  const uploadData = () => {
      if(file){

        setIsUploading(true);

        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on('state_changed', 
          (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            console.log(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

              try{

                const docRef = await addDoc(collection(db, "events"), {
                  image: downloadURL,
                  description: description
                });

                setIsUploading(false);
                setFile(null);
                setIsVisible(false);

                console.log("Document uploaded");
                alert("Document uploaded");
                setEvents([]);
                fetchEvents();

              }catch(e){
                alert("Error adding document: ");
                console.error("Error adding document: ", e);
              }
            });
          }
        );


      }
  }



  // // Fetch data 

  const [events, setEvents] = React.useState([]);

  const fetchEvents = async () => {
    const q = query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEvents(events =>  [...events, {id: doc.id, data:  doc.data()}]);
      console.log(doc.id)
    });
  }

  useEffect(() => {

    fetchEvents();

  }, []);


  // Delete image

  const deleteEvent = async (id) => {
    try{

      await deleteDoc(doc(db, "events", `${id}`));
      alert("event deleted");
      setEvents([]);
      fetchEvents();
    }catch(e){
      alert("Error deleting event: ");
      console.error("Error deleting document: ", e);
    }

  }

  return (
    <div className="admin_event">
            <span>
              <h3>News & Events</h3>
              <button className='admin_button' onClick={()=> setIsVisible(true)} >Add new</button>
            </span>

            {isVisible &&

            <div className="newBannerImg">
                <input type="file" id="file"  onChange={(e)=>setFile(e.target.files[0])} />
                <textarea placeholder='Description' onChange={(e)=>setDescription(e.target.value)} value={description} />
                
                <span>
                    {isUploading ?
                      <Button variant="success" disabled>Uploading...</Button>
                    :
                      <Button variant="success" onClick={uploadData} >Upload</Button>
                    
                    }
                    <Button variant="danger"  onClick={()=> setIsVisible(false)}>Cancel</Button>
                </span>
            </div>
            }

            {events.length > 0 ?

            <div className="admin_event_images">
                {events.map((event, index) => (
                  <div className="admin_event_image" key={index}>
                    <img src={event.data.image} alt="banner" />
                    <p>{event.data.description}</p>
                    <button onClick={()=> deleteEvent(event.id)} >Delete</button>
                  </div>
                ))}
            </div>

            : <p>No events</p>
            }



        </div>
  )
}

export default AdminEvents