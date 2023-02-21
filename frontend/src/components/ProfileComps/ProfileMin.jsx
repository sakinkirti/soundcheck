import React from 'react'
import ProfilePic from './ProfilePic'

const ProfileMin = ({username}) => {
  return (
    <div style={{flexDirection:'row', display:'flex', width: '100%', backgroundColor: 'white', borderRadius: '25px',  height: '30px', textAlign: 'left', paddingLeft: '10px', paddingTop:'3px'}}>
      <ProfilePic />
      <div style={{paddingLeft: '10px'}}>
        <p style={{fontSize: '10px', paddingTop:'4px'}}>{username}</p>
      </div>
    </div>
  )
}

export default ProfileMin