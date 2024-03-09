import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'


const AdminAmenities = () => {

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

                const docRef = await addDoc(collection(db, "amenities"), {
                  image: downloadURL,
                  description: description
                });

                setIsUploading(false);
                setFile(null);
                setIsVisible(false);

                console.log("Document uploaded");
                alert("Document uploaded");
                setAmenities([]);
                fetchAmenities();

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

  const [amenities, setAmenities] = React.useState([]);

  const fetchAmenities = async () => {
    const q = query(collection(db, "amenities"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setAmenities(amenities =>  [...amenities, {id: doc.id, data:  doc.data()}]);
      console.log(doc.id)
    });
  }

  useEffect(() => {

    fetchAmenities();

  }, []);


  // Delete image

  const deleteAmenity = async (id) => {
    try{

      await deleteDoc(doc(db, "amenities", `${id}`));
      alert("amenity deleted");
      setAmenities([]);
      fetchAmenities();
    }catch(e){
      alert("Error deleting amenity: ");
      console.error("Error deleting document: ", e);
    }

  }

  return (
    <div className="admin_event">
            <span>
              <h3>Amenities </h3>
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

            {amenities.length > 0 ?

                  <div className="admin_event_images">
                      {amenities.map((amenity, index) => (
                        <div className="admin_event_image" key={index}>
                          <img src={amenity.data.image} alt="banner" />
                          <p>{amenity.data.description}</p>
                          <button onClick={()=> deleteAmenity(amenity.id)} >Delete</button>
                        </div>
                      ))}
                  </div>
              
              : <p>No amenities</p>
            }


        </div>
  )
}

export default AdminAmenities