import React, { useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../styles/Events.css'
import { FaRegHandPointRight } from "react-icons/fa";
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


const Events = () => {

  const [events, setEvents] = React.useState([]);

  const fetchEvents = async () => {
    const q = query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEvents(events =>  [...events, {id: doc.id, data:  doc.data()}]);
    });
  }

  const [upEvents, setUpEvents] = React.useState([]);

  const fetchUpEvents = async () => {
    const q = query(collection(db, "upcommeingEvents"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUpEvents(upEvents =>  [...upEvents, {id: doc.id, data:  doc.data()}]);
    });
  }

  useEffect(() => {

    fetchEvents();
    fetchUpEvents();

  }, []);


  return (
    <div className='events' id='Events' >


        
        <div className="eventsTotalContent">
            <div className="title">
                <h1>News & Events</h1>
                <hr id='eventsHr1'/>
            </div>

            {events.length>0?
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
                    {events.map((event, index) => {
                      return (
                        <div className="eve_slider" key={index}>
                          <img src={event.data.image} alt="movie" />
                          <p>{event.data.description}</p>
                        </div>
                      );
                    })}
            
            </Carousel>
            : <p>loading...</p>
            }
            


             </div>
        <div className="upcommingEvents">
            <div className="title">
                <h2>Upcomming Events</h2>
                <hr id="eventsHr2" />
            </div>
            
            {upEvents.length> 0?
                <div className='upcommingEventsList'>

                  {upEvents.reverse().map((event, index)=>(
                      <span key={index}>
                        <FaRegHandPointRight className='upcommingEventIcon' key={index} />
                        <p>{event.data.event}</p>
                      </span>
                  ))}
                </div>
            
            : <p>No new events...</p>
            }
            
        </div>
 

    </div>
  )
}

export default Events