import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'


const AdminHero = () => {

  const [isVisible, setIsVisible] = React.useState(false);

  const [isUploading, setIsUploading] = React.useState(false);

  const [file, setFile] = React.useState(null);
 

  const storage = getStorage();
  const storageRef = ref(storage, uuidv4());
  
  


  const uploadPic = () => {
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

                const docRef = await addDoc(collection(db, "heroImgs"), {
                  image: downloadURL,
                });

                setIsUploading(false);
                setFile(null);
                setIsVisible(false);

                console.log("Document uploaded");
                alert("Document uploaded");
                setHeroImgs([]);
                fetchHeroImgs();

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

  const [heroImgs, setHeroImgs] = React.useState([]);

  const fetchHeroImgs = async () => {
    const q = query(collection(db, "heroImgs"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setHeroImgs(heroImgs =>  [...heroImgs, {id: doc.id, image:  doc.data().image}]);
      console.log(doc.id)
    });
  }

  useEffect(() => {

    fetchHeroImgs();

  }, []);


  // Delete image

  const deleteImg = async (id) => {
    try{

      await deleteDoc(doc(db, "heroImgs", `${id}`));
      alert("Image deleted");
      setHeroImgs([]);
      fetchHeroImgs();
    }catch(e){
      alert("Error deleting image: ");
      console.error("Error deleting document: ", e);
    }

  }

  return (
    <div className="admin_hero">
            <span>
              <h3>Banner Images</h3>
              <button className='admin_button' onClick={()=> setIsVisible(true)} >Add new Image</button>
            </span>

            {isVisible &&

            <div className="newBannerImg">
                <input type="file" id="file" onChange={(e)=> setFile(e.target.files[0])}/>
                <span>
                    {isUploading ?
                      <Button variant="success" disabled >Uploading...</Button>
                    :
                      <Button variant="success" onClick={uploadPic} >Upload</Button>
                    }
                    <Button variant="danger"  onClick={()=> setIsVisible(false)}>Cancel</Button>
                </span>
            </div>
            }

            {
              heroImgs.length > 0 ?

              <div className="admin_hero_images">

              {heroImgs.map((img, index) => (
                <div className="admin_hero_image" key={index}>
                  <img src={img.image} alt="banner" />
                  <button onClick={()=> deleteImg(img.id)} >Delete</button>
                </div>
              ))}
            </div>
              
              :<p>No images available(loading....)</p>
            }

        </div>

  )
}

export default AdminHero