import React from 'react'
import PostGrid from './PostComps/PostGrid'
import './postsLayout.css'
import Post from './PostComps/Post'

function PostsLayout() {

  const posts = [
    {
    id: 0,
    username: 'user1',
    album: 'album1',
    song: 'song1',
    artist: 'artist1',
    },{
    id: 1,
    username: 'user2',
    album: 'album2',
    song: 'song2',
    artist: 'artist2',
  },
  {
    id: 2,
    username: 'user3',
    album: 'album3',
    song: 'song3',
    artist: 'artist3',
  },
  {
    id: 3,
    username: 'user4',
    album: 'album4',
    song: 'song4',
    artist: 'artist4',
  },
  {
    id: 4,
    username: 'user5',
    album: 'album5',
    song: 'song5',
    artist: 'artist5',
  }

]

  return (
    <div style={{margin: '10px', width: '72%', height: '90vh'}}>
      <h1>Your Friend's Posts</h1>
      <PostGrid colCount={2} md={6}> 
        {
          posts.length > 0 ? posts.map(post => <Post key={post.id} username={post.username} album={post.album} artist={post.artist} song={post.song}/>) : [<p>No Posts Yet</p>]
        }
      </PostGrid>
    </div>
  )
}

export default PostsLayout