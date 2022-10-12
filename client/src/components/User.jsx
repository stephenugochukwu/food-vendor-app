import React from 'react'
import { UserStyle } from '../styles/UserStyle'

export const User = () => {
  return (
    <UserStyle>
    <div className='wrapper'>
      <div className='name'>
       <p>XYZ User</p>
      </div>
      <div className='btn'>
        <button className='remove'>Remove</button>
      </div>
    </div>
  </UserStyle>
  )
}
