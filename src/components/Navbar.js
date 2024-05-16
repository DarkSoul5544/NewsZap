import React from 'react'
import myImage from "./uploads/logo.png"
import news from "./uploads/logo.png"


export default function Navbar() {
  return (
    <>
   <nav className="navbar navbar-expand-lg d-flex justify-content-start"
   style={{ backgroundColor: "#1C1678" }}>
  <div className="container-fluid d-flex justify-content-start ">
  <img src={myImage} width="100" height="100" alt="logo" />
    <a className="navbar-brand text-light mx-3 " href="/"><h2>𝓝𝓮𝔀𝓼𝓩𝓪𝓹</h2></a>
  </div>

  {/* lines */}
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
            <li><a className="dropdown-item" href="/profile">My Profile</a></li>
            <li><a className="dropdown-item" href="/login">Login</a></li>
            <li><a className="dropdown-item" href="/signup">Sign Up</a></li>
            <li><a className="dropdown-item" href="/premium">Premium</a></li>
  </ul>
  <div className="container_outer_img1">
 <div className="img-inner1">
 <img src={news}  alt="" className="container_img1"/>
       </div>
     </div>
</nav>


</nav>
    </>
  )
}
