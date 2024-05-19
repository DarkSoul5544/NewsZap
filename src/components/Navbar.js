import React, { useState, useEffect } from 'react';
import myImage from "./uploads/logo.png";
import news from "./uploads/logo.png";

export default function Navbar({ handleCategoryChange, handleCountryChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg  sticky-top" style={{ backgroundColor: "#1C1678" }}>
      <div className="container-fluid ">
        <img src={myImage} width="100" height="100" alt="logo" />
        <a className="navbar-brand text-light mx-3" href="/">
          <h2>𝓝𝓮𝔀𝓼𝓩𝓪𝓹</h2>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
        <div className='collapse navbar-collapse ' id="navbarSupportedContent">
        <ul className="navbar-nav  ">
            <li className="nav-item mx-5">
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('crime')}>Crime</button>
            </li>
            <li className="nav-item mx-5">
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('entertainment')}>Entertainment</button>
            </li>
            <li className="nav-item mx-5">
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('business')}>Business</button>
            </li>
            <li className="nav-item mx-5" >
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('health')}>Health</button>
            </li>
            <li className="nav-item mx-5">
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('science')}>Science</button>
            </li>
            <li className="nav-item mx-5">
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('sports')}>Sports</button>
            </li>
            <li className="nav-item mx-5">
              <button className="nav-link btn text-light" onClick={() => handleCategoryChange('technology')}>Technology</button>
            </li>
          </ul>
          </div>
      </div>

      <input id="page-nav-toggle" className="main-navigation-toggle fixed-top" type="checkbox" />
      <label htmlFor="page-nav-toggle">
        <svg className="icon--menu-toggle" viewBox="0 0 60 30">
          <g className="icon-group">
            <g className="icon--menu">
              <path d="M 6 0 L 54 0" />
              <path d="M 6 15 L 54 15" />
              <path d="M 6 30 L 54 30" />
            </g>
            <g className="icon--close">
              <path d="M 15 0 L 45 30" />
              <path d="M 15 30 L 45 0" />
            </g>
          </g>
        </svg>
      </label>

      <nav className="main-navigation">
        <ul className='align-items-start'>
          {isLoggedIn ? (
            <>
              <li><a className="dropdown-item" href="/profile">My Profile</a></li>
              <li><a className="dropdown-item" href="/premium">Premium</a></li>
              <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Logout</a></li>            </>
          ) : (
            <>
              <li><a className="dropdown-item" href="/login">Login</a></li>
              <li><a className="dropdown-item" href="/signup">Sign Up</a></li>
            </>
          )}
        </ul>
        <div className="container_outer_img1">
          <div className="img-inner1">
            <img src={news} alt="" className="container_img1" />
          </div>
        </div>
      </nav>
    </nav>
  );
}
