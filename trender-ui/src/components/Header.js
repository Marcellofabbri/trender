import React from 'react';
import '../style/Header.css';
import logoPng from '../logo/logoPng.png'

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={ logoPng } className="trenderLogo" />
      </div>
    </div>
  )
}

export default Header;