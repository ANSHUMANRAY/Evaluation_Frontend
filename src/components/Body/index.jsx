import React from 'react';
import {makeRequest} from '../../utils/makeRequest';
import { GET_ALL_EVENTS } from '../../constants/apiEndPoints';
import Event from '../Event';
import filterIcon from '../../assets/filter-solid.svg';
import searchIcon from '../../assets/magnifying-glass-solid.svg';
import circle from '../../assets/circle-regular.svg';
import circleDot from '../../assets/circle-dot-solid.svg';
import chevronUp from '../../assets/chevron-up-solid.svg';
import './Body.css';

export default function Body() {
  const [events, setEvents] = React.useState();
  const [search, setSearch] = React.useState();
  const [change, isChange] = React.useState(false);
  const [isAll, setIsAll] = React.useState(true);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [areSeatsAvailable, setAreSeatsAvailable] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  //   const [isDetailsOpen, setIsDetailsOpen] = React.useState(0);
  React.useEffect(() => {
    makeRequest(GET_ALL_EVENTS, {})
      .then((res) => {
        const tempEvents = res.filter((event) => {
          if(isAll) {
            return event;
          }
          else if(isBookmarked && event.isBookmarked) {
            return event;
          }
          else if(isRegistered && event.isRegistered) {
            return event;
          }
          else if(areSeatsAvailable && event.areSeatsAvailable) {
            return event;
          }
        });
        setEvents(tempEvents);
        setSearch(tempEvents);
      });
  }, [isAll, isBookmarked, isRegistered, areSeatsAvailable, change]);

  const allFiltericon = isAll ? circleDot : circle;
  const bookmarkedFiltericon = isBookmarked ? circleDot : circle;
  const registeredFiltericon = isRegistered ? circleDot : circle;
  const seatsAvailableFiltericon = areSeatsAvailable ? circleDot : circle;

  const filterBySearch = (e) => {
    const searchText = e.target.value;
    const tempEvents = search.filter((event) => {
      if(event.name.toLowerCase().includes(searchText.toLowerCase())) {
        return event;
      }
    });
    setEvents(tempEvents);
  };
  return events ? (
    <div className='mainBody'>
      <div className='filterSearch'>
        <div onClick={() => setIsFilterOpen(!isFilterOpen)} className='filter'>
          <img src={filterIcon} alt='filter' />
          <p>Filter</p>
          <img src={chevronUp} alt='chevronUp' />
        </div>
        <div className='search'>
          <input type="text" name='searchText' onChange={filterBySearch} placeholder='Event Name'/>
          <img src={searchIcon} alt='search' />
        </div>
      </div>
      {isFilterOpen ? (<div className='filters'>
        <div className='Filterline'>
          <div className='filterElements' onClick={() => setIsAll(!isAll)}>
            <img className='radioButton' src={allFiltericon} alt='circle' />
            <p>All</p>
          </div>
          <div className='filterElements' onClick={()=>setIsBookmarked(!isBookmarked)}>
            <p>Bookmarked</p>
            <img className='radioButton' src={bookmarkedFiltericon} alt='circleDot' />
          </div>
        </div>
        <div className='Filterline'>
          <div className='filterElements' onClick={()=>setIsRegistered(!isRegistered)}>
            <img className='radioButton' src={registeredFiltericon} alt='circleDot' />
            <p>Registered</p>
          </div>
          <div className='filterElements' onClick={()=>setAreSeatsAvailable(!areSeatsAvailable)}>
            <p>Seats Available</p>
            <img className='radioButton' src={seatsAvailableFiltericon} alt='circleDot' />
          </div>
        </div>
      </div>): (<div></div>)}
      <div className='events'>
        {events.map((event) => (
          <Event key={event.id} event={event} isChange={isChange}/>
        ))}
      </div>
    </div>
  ) : (<div>Loading...</div>);
}