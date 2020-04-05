import React from 'react'
import logoUrl from '../../static/logo.png'
import './logo.css'

function Logo() {
  return (
    <div>
      <img className="logo" src={logoUrl} alt="Lucent Logo" />
    </div>
  )
}

export default Logo
