import React from 'react'
import ProfilePic from './ProfilePic'

const ProfileMin = ({username}) => {
  return (
    <div style={{flexDirection:'row', display:'flex', width: '100%', backgroundColor: 'white', borderRadius: '25px',  height: '30px', textAlign: 'left', paddingLeft: '10px', paddingTop:'3px'}}>
      <ProfilePic />
      <div style={{paddingLeft: '10px'}}>{username}</div>
    </div>
  )
}

export default ProfileMin