import React from 'react'
import defaultPic from '../../public/default_profile.png'

const ProfilePic = () => {
  return (
    <img style={{height:'22px', width:'22px'}} src={defaultPic} alt="default"></img>
  )
}

export default ProfilePic