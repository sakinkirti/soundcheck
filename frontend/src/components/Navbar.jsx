import './navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {

  const [buttonText, setButtonText] = useState('Profile');

  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const changeBtn = () => {
      if (location.pathname === '/profile')
        setButtonText('Home');
      else if (location.pathname === '/')
        setButtonText('Profile');
    }
    return () => {
      changeBtn();
    };
  }, [location.pathname])

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `profile`;
    navigate(path);
  }

  return (
    <div className='navbarContainer'>
      <div className='navbarLeft'>
      </div>
      <div className='navbarCenter'>
        <h1 className='navbarTitle'>Soundcheck!</h1>
      </div>
      <div className='navbarRight'>
        <button onClick={routeChange} className='profileBtn'>{buttonText}</button>
      </div>
    </div>
  )
}

