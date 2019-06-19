import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderBar } from './styles';
import logo from '../../assets/logo.svg';
import camera from '../../assets/camera.svg';

const Header = () => {
  return (
    <HeaderBar>
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="InstaRocket" />
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar publicação" />
        </Link>
      </div>
    </HeaderBar>
  );
};
export default Header;
