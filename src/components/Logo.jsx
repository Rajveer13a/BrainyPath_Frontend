import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to={"/"}>
      <div className='text-2xl font-semibold'>
        BrianyPath
      </div>
    </Link>
  )
}

export default Logo
