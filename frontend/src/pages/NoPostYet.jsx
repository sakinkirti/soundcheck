import React from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import RightBar from '../components/RightBar'
import { useNavigate } from 'react-router-dom'

const NoPostYet = () => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/addpost`;
    navigate(path);
  }
  return (
    <div>
      <Navbar/>
      <RightBar username='Yourusername' song='Song' artist='Artist'albumImg='Your song will appear here once you have posted'/>
      <div style={{backgroundColor: 'antiquewhite', width:'70%', height:'95vh', borderRadius:'25px', margin:'10px', textAlign:'center'}}>
        <h1 style={{paddingTop: '70px', fontSize:'20px'}}>It's time to post!</h1>
        <h1 style={{paddingLeft: '10%', paddingRight:'10%', fontSize:'20px'}}>Post your most recent song to see what your friends are listening to!</h1>
        <div style={{paddingTop: '20px'}}>
          <Button onClick={routeChange} style={{backgroundColor: 'var(--color-sage)', border:'none', color:'black', borderRadius:'25px', width:'50%'}}>Post a Song</Button>
        </div>
      </div>
    </div>
  )
}

export default NoPostYet