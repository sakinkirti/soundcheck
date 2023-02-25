import React from 'react'
import Navbar from '../components/Navbar'
import './profile.css'
import Button from '../components/Button'
import Username from '../components/ProfileComps/Username'
import Name from '../components/ProfileComps/Name'
import ProfilePic from '../components/ProfileComps/ProfilePic'
import Followers from '../components/ProfileComps/Followers'
import Following from '../components/ProfileComps/Following'
import BioText from '../components/ProfileComps/BioText'
import ProfileMin from '../components/ProfileComps/ProfileMin'
import { useState } from 'react'

function Profile({ username, name, profilePic }) {
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const openFollowers = () => setFollowersOpen(!followersOpen);
  const openFollowing = () => setFollowingOpen(!followingOpen);

  return (
    <div className='profileContainer'>
      <Navbar />
      <div className='followersDropdown' style={{ visibility: followersOpen ? 'visible' : 'hidden' }}>
        <Button style={{margin:'10px', width:'100px', float:'right'}} onClick={openFollowers}>Close</Button>
        <input placeholder='Search for Friends' className='searchInput'></input>
        <div style={{ marginLeft: '25px', width: '90%' }}>
          <ProfileMin username='username' />
        </div>
      </div>
      <div className='followingDropdown' style={{ visibility: followingOpen ? 'visible' : 'hidden' }}>
        <Button style={{margin:'10px', width:'100px', float:'right'}} onClick={openFollowing}>Close</Button>
        <input placeholder='Search for Friends' className='searchInput'></input>
        <div style={{ marginLeft: '25px', width: '90%' }}>
          <ProfileMin username='username' />
        </div>
      </div>
      <div style={{ width: '97%', backgroundColor: 'var(--color-sage)', height: '80vh', margin: '10px', borderRadius: '20px', }}>
        <div className='leftContainer'>
          <div style={{ marginTop: '10px' }}>
            <Username username='Username' />
            <Name name='Name' />
          </div>
          <div style={{ backgroundColor: 'white', margin: '10px', height: '60%', width: '60%', marginLeft: '20%' }}>
            <ProfilePic style={{ textAlign: 'center' }} />
          </div>
        </div>
        <div className='rightContainer'>
          <div className='rightTopContainer'>
            <div onClick={openFollowers} style={{ cursor: 'pointer', }} className='followersContainer'>
              <Followers count='100' />
            </div>
            <div onClick={openFollowing} style={{ cursor: 'pointer', }} className='followingContainer'>
              <Following count='100' />
            </div>
          </div>
          <div className='rightBottomContainer'>
            <div>Bio</div>
            <div style={{ margin: '10px', }}>
              <BioText text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
            </div>
          </div>
        </div>
        <Button style={{ float: 'right', marginTop: '8px', marginRight: '10px', width: '60%' }} type='edit'>Edit Profile</Button>
      </div>
    </div>
  )
}

export default Profile