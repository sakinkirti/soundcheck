import './navbar.css'

export default function Navbar() {
  return (
    <div className='navbarContainer'>
      <div className='navbarLeft'>
      </div>
      <div className='navbarCenter'>
        <h1 className='navbarTitle'>Soundcheck!</h1>
      </div>
      <div className='navbarRight'>
        <button className='profileBtn'>Profile</button>
      </div>
    </div>
  )
}

