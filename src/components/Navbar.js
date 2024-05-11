import React from 'react'
import myImage from "./uploads/logo.png"



export default function Navbar() {
  return (
    <>
   <nav className="navbar navbar-expand-lg "
   style={{ backgroundColor: "#1C1678" }}>
  <div className="container-fluid">
  <img src={myImage} width="100" height="100" alt="logo" />
    <a className="navbar-brand text-light mx-3 " href="/"><h2>𝓝𝓮𝔀𝓼𝓩𝓪𝓹</h2></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse d-flex justify-content-end mx-5 " id="navbarNavDarkDropdown">
      <ul className="navbar-nav ">
        <li className="nav-item dropdown d-flex justify-content-start mx-4">
        
        </li>
      </ul>
    </div>
  </div>

  {/* lines */}
  <input id="page-nav-toggle" className="main-navigation-toggle fixed-top" type="checkbox" />
<label for="page-nav-toggle">
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
            <li><a className="dropdown-item" href="/profile">My Profile</a></li>
            <li><a className="dropdown-item" href="/login">Login</a></li>
            <li><a className="dropdown-item" href="/signup">Sign Up</a></li>
            <li><a className="dropdown-item" href="/premium">Premium</a></li>
  </ul>
</nav>


</nav>
    </>
  )
}
