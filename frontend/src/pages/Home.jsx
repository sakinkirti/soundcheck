import React from 'react'
import Navbar from '../components/Navbar'
import PostsLayout from '../components/PostsLayout'
import RightBar from '../components/RightBar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <RightBar/>
      <PostsLayout/>
    </div>
  )
}

export default Home