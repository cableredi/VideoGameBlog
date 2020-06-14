import React from "react";
import Logo from '../Assets/Images/24g_logo.svg';

export default function Header() {
  return (
    <div className="Header">
      <img src={Logo} alt='24G Logo' />
      <div>VIDEO PLAYER</div>
    </div>
  );
}