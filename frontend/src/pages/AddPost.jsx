import React from 'react'
import Navbar from '../components/Navbar'
import RightBar from '../components/RightBar'
import Button from '../components/Button'
import AlbumImg from '../components/PostComps/AlbumImg'
import SongName from '../components/PostComps/SongName'
import ArtistName from '../components/PostComps/ArtistName'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  }
  return (
    <div>
      <Navbar/>
      <RightBar username='Yourusername' song='Song' artist='Artist'albumImg='Your song will appear here once you have posted'/>
      <div style={{backgroundColor: 'antiquewhite', width:'70%', height:'95vh', borderRadius:'25px', margin:'10px', textAlign:'center'}}>
        <div style={{paddingTop:'10%'}}>
          <h1>Your Song</h1>
        </div>
        <div style={{marginLeft:'33%', marginRight:'33%'}}>
          <AlbumImg img='album'/>
          <SongName song='song'/>
          <ArtistName artist='artist'/>
        </div>
        
        <div style={{paddingTop: '20px',}}>
          <Button onClick={routeChange} style={{backgroundColor: 'var(--color-sage)', border:'none', color:'black', borderRadius:'25px', width:'50%'}}>Post this Song</Button>
        </div>
        </div>
    </div>
  )
}

export default AddPost