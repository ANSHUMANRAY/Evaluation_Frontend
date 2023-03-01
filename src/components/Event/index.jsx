/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import check from '../../assets/circle-check-solid.svg';
import cross from '../../assets/circle-xmark-solid.svg';
import bookmarked from '../../assets/bookmark-solid.svg';
import bookmark from '../../assets/bookmark-regular.svg';
import './Event.css';
import { ThemeContext } from '../../contexts/themeContext';
import { useNavigate } from 'react-router-dom';

export default function Event(props) {
  const navigate = useNavigate();
  const {theme} = React.useContext(ThemeContext);
  const { event, isChange } = props;
  const [isBookmarked, setIsBookmarked] = React.useState(event.isBookmarked);
  const bookmarkIcon = isBookmarked ? bookmarked : bookmark;

  const handleBookmark = () => {
    axios.patch(`http://localhost:8000/api/events/${event.id}`, {isBookmarked: !isBookmarked})
      .then(() => {
        setIsBookmarked(!isBookmarked);
        isChange();
      });
  };

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };
  return (
    <div style={{backgroundColor:`${theme}`}} className="event">
      <img onClick={handleClick} src={event.imgUrl} alt={event.name} className="eventImg" />
      <div className="eventInfo">
        <p className='eventName'>{event.name}</p>
        <p className='description'>{event.description}</p>
        <p className='venue'>VENUE:{event.venue}</p>
        <p >DATE:{event.datetime}</p>
      </div>
      <div className="eventStatus">
        <div>
          {event.isRegistered ? (
            <div className='checkDiv'>
              <img className='check' src={check}/>
              <p>Registered</p>
            </div>
          ) : (event.areSeatsAvailable ? (
            <div className='checkDivSeat'>
              <img className='check' src={cross}/>
              <p>No Seats Available</p>
            </div>
          ) : (<div></div>))}
        </div>
        <div onClick={handleBookmark}>
          <img className='bookmark' src={bookmarkIcon} alt='bookmark' />
        </div>
      </div>
    </div>
  );
}

// Event.propTypes = {
//   event: PropTypes.object().isRequired,
// };