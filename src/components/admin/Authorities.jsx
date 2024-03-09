import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc , query, where, getDocs, deleteDoc, doc,  getDoc, updateDoc  } from "firebase/firestore"; 
import {db } from '../../firebase'

const Authorities = () => {

  const [update, setUpdate] = React.useState(false);

  const [isUploading, setIsUploading] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const [qualification, setQualification] = React.useState('');
 

  const storage = getStorage();
  const storageRef = ref(storage, uuidv4());
  
  


  const updateData = async () => {
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

                const docRef = doc(db, "authorities", `${iid}`);

                await updateDoc(docRef, {
                  image: downloadURL,
                  name: name,
                  qualification: qualification,
                  designation: designation,
                });

                setIsUploading(false);
                setFile(null);

                console.log("Document uploaded");
                alert("Document uploaded");
                setName("");
                setDesignation("");
                setQualification("");
                setFile(null)
                setMembers([]);
                fetchMembers();
                setUpdate(false)

              }catch(e){
                alert("Error adding document: ");
                console.error("Error adding document: ", e);
              }
            });
          }
        );


      }else{

        setIsUploading(true);

        const docRef = doc(db, "authorities", `${iid}`);

        await updateDoc(docRef, {
          name: name,
          qualification: qualification,
          designation: designation,
        });

        setIsUploading(false);
        setFile(null);

        console.log("Document uploaded");
        alert("Document uploaded");
        setName("");
        setDesignation("");
        setQualification("");
        setFile(null)
        setMembers([]);
        fetchMembers();

        setUpdate(false)

      }
  }



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


  // startUpdate

  const [iid, setIid] = useState("")


  const startUpdate = async(id)=>{

    setUpdate(true)

    const docRef = doc(db, "authorities", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log("Document data:", docSnap.data());

      setIid(docSnap.id);
      setName(data.name);
      setDesignation(data.designation);
      setQualification(data.qualification)

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }



  return (

    <div className="admin_authorities_page">

        <h3>Authorities</h3>
    
        <div className="admin_authority_body">
        <div className='AdminAuthorities'>
            
          {members.length > 0 ?
          
            <div className="admin_members">

                  {members.map((member, index) => {
                    return (
                      <div className="admin_member" key={index}>
                        <img src={member.data.image} alt=""/>
                        <h3>{member.data.name} <span>{member.data.qualification}</span> </h3>
                        <span>{member.data.designation}</span><br />
                        <button onClick={()=> startUpdate(member.id)}>Update</button>
                      </div>
                    )})}
            </div>
          :
            <p>No Authorities(loading....)</p>
          }

        </div>

        {update?
        
          <div className="update_authority">
            <h4>Update data</h4>
            <label htmlFor="memberImg">Image</label>
            <input type="file" id='memberImg' onChange={(e)=> setFile(e.target.files[0])} />
            <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} value={name} />
            <input type="text" placeholder="Qualifications" onChange={(e)=> setQualification(e.target.value)} value={qualification}  />
            <input type="text" placeholder="Designation" onChange={(e)=> setDesignation(e.target.value)} value={designation}  />
            <span>
              {isUploading ?
                <button disabled>Saving...</button>
              :
              <button onClick={()=> updateData(iid)} >Save</button>
              }
              <button className='red_btn'>Cancel</button>
            </span>
          </div>
        :""}


    </div>
    </div>
  )
}

export default Authorities