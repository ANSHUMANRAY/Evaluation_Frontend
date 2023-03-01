
import React from 'react';
import axios from 'axios';
import check from '../../assets/circle-check-solid.svg';
import cross from '../../assets/circle-xmark-solid.svg';
import bookmarked from '../../assets/bookmark-solid.svg';
import bookmark from '../../assets/bookmark-regular.svg';
import { useParams } from 'react-router-dom';
import './EventDetails.css';
import { ThemeContext } from '../../contexts/themeContext';

export default function Event() {
  const {theme} = React.useContext(ThemeContext);
  const {id} = useParams();
  const [event, setEvent] = React.useState({});
  const [isBookmarked, setIsBookmarked] = React.useState(event.isBookmarked);
  const [isRegistered, setIsRegistered] = React.useState(event.isRegistered);
  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setIsBookmarked(response.data.isBookmarked);
        setIsRegistered(response.data.isRegistered);
      });
  }, []);
  const bookmarkIcon = isBookmarked ? bookmarked : bookmark;
  const registerText = isRegistered ? 'UNREGISTER' : 'REGISTER';
  const handleBookmark = () => {
    axios.patch(`http://localhost:8000/api/events/${event.id}`, {isBookmarked: !isBookmarked})
      .then(() => {setIsBookmarked(!isBookmarked);});
  };
  const handleRegister = () => {
    axios.patch(`http://localhost:8000/api/events/${event.id}`, {isRegistered: !isRegistered})
      .then(() => {setIsRegistered(!isRegistered);});
  };
  return event ? (
    <div style={{backgroundColor: `${theme}`}} className="eventDetails">
      <img src={event.imgUrl} alt={event.name} className="eventDetailsImg" />
      <div className="eventDetailsInfo">
        <p className='eventDetailsName'>{event.name}</p>
        <p className='detailsDescription'>{event.description}</p>
        <p className='detailsVenue'>VENUE:{event.venue}</p>
        <p >DATE:{event.datetime}</p>
      </div>
      <div className="eventDetailStatus">
        <div>
          {event.isRegistered ? (
            <div className='checkDetailDiv'>
              <img className='checkDetail' src={check}/>
              <p>Registered</p>
            </div>
          ) : (event.areSeatsAvailable ? (
            <div className='checkDetailDiv'>
              <img className='checkDetail' src={cross}/>
              <p>No Seats Available</p>
            </div>
          ) : (<div></div>))}
        </div>
        <div onClick={handleBookmark}>
          <img className='detailBookmark' src={bookmarkIcon} alt='bookmark' />
        </div>
      </div>
      <button onClick={handleRegister} className='registerButton'>{registerText}</button>
    </div>
  ) : (<div>Loading...</div>);
}