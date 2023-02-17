import React from 'react'
import './start.css'
import { FaSpotify } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Start = () => {

  // const location = useLocation();
  
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/signup`;
    navigate(path);
  }

  return (
    <div className='pageContainer'>
      <h1 className='title'>
        Soundcheck!
      </h1>
      <h1 className='description'>
        Signin using your Spotify Credentials
      </h1>
      <button onClick={routeChange} className='spotifyButton'>
        <FaSpotify className='spotifyIcon' />
        Login with Spotify
      </button>
    </div>
  )
}

export default Start