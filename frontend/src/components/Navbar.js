

import React, { useState, useEffect } from 'react';
import myImage from "./uploads/logo.png";
import news from "./uploads/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Navbar({ handleCategoryChange, handleCountryChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsPremium(response.data.is_premium);
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Redirect to login page after logout
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePremiumCategoryChange = (category) => {
    if (isPremium) {
      handleCategoryChange(category);
    } else {
      if (isLoggedIn) {
        alert('Please purchase a premium subscription to access this category.');
        window.location.href = '/premium';
      } else {
        alert('Please log in to access premium content.');
        window.location.href = '/login';
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#1C1678" }}>
      <div className="container-fluid">
        <img src={myImage} width="100" height="100" alt="logo" />
        <a className="navbar-brand text-light mx-4" href="/">
          <h2>𝓝𝓮𝔀𝓼𝓩𝓪𝓹</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('crime')}>Crime</button>
            </li>
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('entertainment')}>Entertainment</button>
            </li>
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('business')}>Business</button>
            </li>
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('health')}>Health</button>
            </li>
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('science')}>Science</button>
            </li>
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('sports')}>Sports</button>
            </li>
            <li className="nav-item mx-4">
              <button className="nav-link btn text-light" onClick={() => handlePremiumCategoryChange('technology')}>Technology</button>
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
              <li>{userRole === 'higher-admin' || userRole === 'administrator' ? (
                  <a className="nav-link text-light" href="/adminpanel">Admin Panel</a>
                ) : null}</li>
              <li><a className="dropdown-item" href="/premium">Premium</a></li>
              <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <>
              <li><a className="dropdown-item" href="/login">Login</a></li>
              <li><a className="dropdown-item" href="/signup">Sign Up</a></li>
            </>
          )}
        </ul>
        <div className="container_outer_img1">
          <div className="img-inner1">
            <img src={news} alt="news" className="container_img1" />
          </div>
        </div>
      </nav>
    </nav>
  );
}

