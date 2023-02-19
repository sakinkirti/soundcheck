import React from 'react'
import Navbar from '../components/Navbar'
import './profile.css'
import Button from '../components/Button'

function Profile() {
  return (
    <div className='profileContainer'>
      <Navbar />
      <div style={{ width: '97%', backgroundColor: 'var(--color-sage)', height: '80vh', margin: '10px', borderRadius: '20px', }}>
        <div className='leftContainer'>
          <h1 style={{float:'bottom'}}>username component</h1>
        </div>
        <div className='rightContainer'>
          <div className='rightTopContainer'>
            <div className='followersContainer'>followers</div>
            <div className='followingContainer'>following</div>
          </div>
          <div className='rightBottomContainer'>
            <div>bio</div>
          </div>
        </div>
        <Button style={{float:'right', marginTop: '8px', marginRight: '10px', width: '60%'}} type='edit'>Edit Profile</Button>
      </div>
    </div>
  )
}

export default Profile