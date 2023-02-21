import React from 'react'

const AlbumImg = ({img}) => {
  return (
    <div style={{ backgroundColor:'white', height: '100px', marginTop: '5px', borderRadius:'25px'}}>
      <p style={{position: 'relative', paddingTop: '25px', paddingLeft: '5%',paddingRight: '5%'}}>
        {img}
      </p>
    </div>
  )
}

export default AlbumImg