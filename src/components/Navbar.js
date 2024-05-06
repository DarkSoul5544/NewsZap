import React from 'react'
import myImage from "./uploads/logo.png"
import userImage from "./uploads/user.png"

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
          <button className="btn" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={userImage} className="fas fa-user-circle" width="50" height="50" alt="user" />
          </button>
          <ul className="dropdown-menu dropdown-menu-dark bg-opacity-0 ">
            <li><a className="dropdown-item" href="/login">Login</a></li>
            <li><a className="dropdown-item" href="/signup">Sign Up</a></li>
            <li><a className="dropdown-item" href="/premium">Premium</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</nav>
    </>
  )
}
