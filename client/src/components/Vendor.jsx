import React from 'react'
import { VendorStyle } from '../styles/VendorStyle';

export const Vendor = () => {
  return (
    <VendorStyle>
    <div className='wrapper'>
      <div className='name'>
       <p>XYZ Vendor</p>
      </div>
      <div className='btn'>
        <button className='verify'>Verify</button>
        <button className='remove'>Remove</button>
      </div>
    </div>
  </VendorStyle>
  )
}