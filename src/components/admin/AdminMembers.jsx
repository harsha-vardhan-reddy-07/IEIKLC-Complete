import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'

const AdminMembers = () => {

  const [update, setUpdate] = React.useState("");

  const [isUploading, setIsUploading] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
 

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

                const docRef = await addDoc(collection(db, "members"), {
                  image: downloadURL,
                  name: name,
                  designation: designation,
                });

                setIsUploading(false);
                setFile(null);

                console.log("Document uploaded");
                alert("Document uploaded");
                setName("");
                setDesignation("");
                setFile(null)
                setMembers([]);
                fetchMembers();

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


  // Delete member

  const deleteMember = async (id) => {
    try{

      await deleteDoc(doc(db, "members", `${id}`));
      alert("member deleted");
      setMembers([]);
      fetchMembers();
    }catch(e){
      alert("Error deleting member: ");
      console.error("Error deleting document: ", e);
    }

  }



  return (
    <div className="admin_authorities_page">

        <h3>Members</h3>
    
        <div className="admin_authority_body">
        <div className='AdminAuthorities'>
            

            {members.length > 0?
                <div className="admin_members">
                    {members.map((member, index) => (
                          <div className="admin_member" key={index}>
                            <img src={member.data.image} alt=""/>
                            <h3>{member.data.name}</h3>
                            <span>{member.data.designation}</span>
                            <span className='buttons'>
                              {/* <button>Update.</button> */}
                              <button className='red_btn' onClick={()=> deleteMember(member.id)} >Delete</button>
                            </span>
                          </div>
                    ))}
  
                </div>            
            :
              <p>No members</p>
            }

        </div>

        <div className="update_authority">
          <h4>Add member</h4>
          <label htmlFor="memberImg">Member Image</label>
          <input type="file" id='memberImg' onChange={(e)=> setFile(e.target.files[0])} />
          <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} value={name} />
          <input type="text" placeholder="Designation" onChange={(e)=> setDesignation(e.target.value)} value={designation}  />
          <span>
            {isUploading ?
              <button disabled>Saving...</button>
            
            :
            <button onClick={uploadData} >Save</button>
            }
            <button className='red_btn'>Cancel</button>
          </span>
        </div>

        

    </div>
    </div>
  )
}

export default AdminMembers