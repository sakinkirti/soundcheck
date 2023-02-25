import React from 'react'
import './profile.css'
import Navbar from '../components/Navbar'
import Username from '../components/ProfileComps/Username'
import Name from '../components/ProfileComps/Name'
import ProfilePic from '../components/ProfileComps/ProfilePic'
import Followers from '../components/ProfileComps/Followers'
import Following from '../components/ProfileComps/Following'
import BioText from '../components/ProfileComps/BioText'

const ProfileView = () => {
  return (
    <div className='profileContainer'>
      <Navbar />
      <div style={{ width: '97%', backgroundColor: 'var(--color-sage)', height: '80vh', margin: '10px', borderRadius: '20px', }}>
        <div className='leftContainer'>
          <div style={{marginTop: '10px'}}>
            <Username username='Username'/>
            <Name name='Name'/>
          </div>
          <div style={{backgroundColor:'white', margin: '10px', height: '60%', width: '60%', marginLeft: '20%'}}>
            <ProfilePic style={{textAlign: 'center'}}/>
          </div>
        </div>
        <div style={{height:'93%'}} className='rightContainer'>
          <div className='rightTopContainer'>
            <div className='followersContainer'>
              <Followers count='100'/>
              </div>
            <div className='followingContainer'>
              <Following count='100'/>
              </div>
          </div>
          <div className='rightBottomContainer'>
            <div>Bio</div>
            <div style={{margin: '10px',}}>
              <BioText text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileView