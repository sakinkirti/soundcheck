import './navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {MdSettings} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import ProfileMin from './ProfileComps/ProfileMin';
import { Button } from 'react-bootstrap';

export default function Navbar() {

  const [buttonText, setButtonText] = useState('Profile');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const search = () => setDropdownOpen(!dropdownOpen);

  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const changeBtn = () => {
      if (location.pathname === '/profile' || location.pathname === '/settings')
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
  const routeSettings = () => {
    let setPath = `settings`
    if ( location.pathname === '/profile' || location.pathname === '/')
      navigate(setPath);
  }

  

  return (
    <>
    <div className='navbarContainer'>
      <div className='navbarLeft'>
        <button onClick={routeSettings}>
          <MdSettings style={{color:'white', fontSize:'30px', paddingTop:'5px'}}/>
        </button>

        <button onClick={search}>
          <FaSearch style={{color:'white', fontSize:'30px', paddingTop:'7px', paddingLeft: '10px'}}/>
        </button>
      </div>
      <div className='navbarCenter'>
        <h1 className='navbarTitle'>Soundcheck!</h1>
      </div>
      <div className='navbarRight'>
        <Button onClick={routeChange} className='profileBtn'>{buttonText}</Button>
      </div>
    </div>
    <div className='searchDropdown' style={{visibility: dropdownOpen ? 'visible' : 'hidden',}}>
      <input placeholder='Search for Friends' className='searchInput'></input>
      <div style={{marginLeft:'25px', width:'90%'}}>
        <ProfileMin username='username'/>
      </div>
    </div>
    </>
  )
}

