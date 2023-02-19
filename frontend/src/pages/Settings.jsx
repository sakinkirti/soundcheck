import React from 'react'
import Navbar from '../components/Navbar'
import './settings.css'
import Button from '../components/Button'

const Settings = () => {
  return (
    <div>
      <Navbar/>
      <h1 style={{textAlign: 'center', marginTop: '5px', fontSize: '20px' }}>Settings</h1>
      <div className='settingsContainer'>
        <div className='leftColumn'>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 1</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 2</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 3</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 4</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 5</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 6</Button>
        </div>
        <div className='rightColumn'>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 7</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 8</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 9</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 10</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 11</Button>
          <Button style={{margin: '5px', width:'95%',}}>Setting Option 12</Button>
        </div>
      </div>
    </div>
  )
}

export default Settings