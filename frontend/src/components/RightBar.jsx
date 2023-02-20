import React from 'react'
import AlbumImg from './PostComps/AlbumImg'
import ArtistName from './PostComps/ArtistName'
import SongName from './PostComps/SongName'
import ProfileMin from './ProfileComps/ProfileMin'
import './rightbar.css'

const RightBar = () => {
  const username = 'username'
  return (
    <div className='rightbarContainer'>
      Your Song
      <div className='rightbarTop'>
        <ProfileMin username={username} style={{float:'left',}}/>
      </div>
      <div className='rightbarMid'>
        <AlbumImg style={{paddingBottom: '20px'}} img='placeholder'/>
      </div>
      <div className='rightbarBottom'>
        <ArtistName artist='placeholder'/>
        <SongName song='placeholder'/>
      </div>
    </div>
  )
}

export default RightBar