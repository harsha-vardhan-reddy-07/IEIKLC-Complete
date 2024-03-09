import React, { useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../styles/Amenities.css'
import { collection, addDoc , query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import {db } from '../../firebase'


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const sliderImageUrl = [
  //First image url
  {
    url:
      "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
  },
  {
    url:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
  },
  //Second image url
  {
    url:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
  },
  //Third image url
  { 
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
  },
  {
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
  },

  {
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU"
  }
];

const Amenities = () => {
  
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
    },[]);

  return (
    <div className='amenities' id='Amenities'>
      <div className="amenities_head">
        <h1>Life at IEI KLC</h1>
        <hr />
      </div>

      {amenities.length>0?
              <Carousel
              responsive={responsive}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              showDots={false}
              infinite={true}
              partialVisible={false}
              dotListClass="custom-dot-list-style"
            >
              {amenities.map((amenity, index) => {
                return (
                  <div className="slider" key={index}>
                    <img src={amenity.data.image} alt="movie" />
                    <p>{amenity.data.description}</p>
                  </div>
                );
              })}
            </Carousel>
      :
        <p>Data will be updated soon....</p>
      }
  

    </div>
  )
}
export default Amenities