import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/Home.css'
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'

const Hero = () => {

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


  return (
    <div className="hero_container">

      {
        heroImgs.length>0?

            <Carousel className="carousel_container">
              {heroImgs.map((img, index)=>(
                <Carousel.Item interval={3000} key={index}>
                  <img className="d-block w-100" src={img.image} alt={`Slide`} />
                </Carousel.Item>
              ))}
            </Carousel>

        : <p>Loading....</p>

      }


    </div>
  )
}

export default Hero