import React from 'react'
import ProfileMin from '../ProfileComps/ProfileMin'
import AlbumImg from './AlbumImg'
import ArtistName from './ArtistName'
import SongName from './SongName'

const Post = props => {
  
  const {username, album, song, artist} = props

  return (
    <div className='grid' style={{textAlign:'center', backgroundColor: 'antiquewhite', borderRadius:'25px', padding: '10px', height: '200px'}}>
      <ProfileMin username={username} style={{float:'center'}}/>
      <AlbumImg img={album}/>
      <SongName song={song}/>
      <ArtistName artist={artist}/>
    </div>
  )
}

export default Post