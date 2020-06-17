import React from "react";
import { NavLink } from "react-router-dom";
import VideoGameBlog from '../Assets/Images/videogameblog.PNG';
import PoweredBy from '../Assets/Images/powered_by_24g.svg';

export default function Landing() {
  return (
    <section className="Landing">
      <header role="banner">
        <h1>Video Game Blog</h1>
        <h2>
          Challenge: to create a video game blog based on the requirements
        </h2>
        <div>
          Bonus: added user authentification to only allow comments when user is
          logged in
        </div>
      </header>
      <div className="Landing__img">
        <img src={VideoGameBlog} alt="Video Game Blog Screenshot" />
      </div>
      <NavLink to="/blog">
        <button>Check it out</button>
      </NavLink>
      <div className='Landing__poweredby'>
        <img src={PoweredBy} alt='Powered By 24G' />
      </div>
    </section>
  );
}
