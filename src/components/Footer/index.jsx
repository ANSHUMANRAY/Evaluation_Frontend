import React from 'react';
import axios from 'axios';
import { ThemeContext } from '../../contexts/themeContext';
import './Footer.css';

export default function Footer() {
  const {theme, setTheme } = React.useContext(ThemeContext);
  const [themeArray, setThemeArray] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://localhost:8000/api/themes')
      .then((response) => {
        const {themes, preferredTheme} = response.data;
        setThemeArray(themes);
        const theme = (themes.find((theme) => theme.id === preferredTheme));
        setTheme(theme.colorHexCode);
      });
  }, []);

  const handleClick = (id) => {
    axios.put('http://localhost:8000/api/themes', {preferredThemeId: id})
      .then(() =>{
        const tempTheme = themeArray.find((theme) => theme.id === id);
        setTheme(tempTheme.colorHexCode);
      });
  };
  return (
    <div style={{backgroundColor:`${theme}`}} className="footer">
      {themeArray.map((theme) => {
        return (
          <div onClick={() => {handleClick(theme.id);}} key={theme.id} style={{backgroundColor:`${theme.colorHexCode}`}} className="themeColor"></div>
        );
      })}
    </div>);
}