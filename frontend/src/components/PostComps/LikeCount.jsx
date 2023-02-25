import React from 'react'

const LikeCount = ({count}) => {
  return (
    <div>
      <p style={{color:'white', fontSize: '10px', marginLeft:'5px', marginTop:'3px'}}>{count}</p>
    </div>
  )
}

export default LikeCount