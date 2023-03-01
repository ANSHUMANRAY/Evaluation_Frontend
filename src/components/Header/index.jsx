import React from 'react';
import { ThemeContext } from '../../contexts/themeContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const {theme} = React.useContext(ThemeContext);
  return(
    <div className='header' style={{backgroundColor:`${theme}`}}>
      <h1 onClick={handleClick}>EVENTIFY</h1>
    </div>
  );
}