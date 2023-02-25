import React from 'react'
import defaultPic from '../../public/default_profile.png'

const ProfilePic = (styles, src) => {
  return (
    <div>
      <img style={{styles}} src={defaultPic} alt="default"/>
    </div>
    
  )
}

export default ProfilePic