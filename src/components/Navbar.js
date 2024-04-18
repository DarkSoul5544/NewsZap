import React from 'react'
import myImage from "./logo.png"

export default function Navbar() {
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-dark ">
  <div className="container-fluid">
  <img src={myImage} width="80" height="80" alt="logo" />
    <a className="navbar-brand text-light mx-3 " href="/">NewsZap</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <li className="nav-item">
                <a className="nav-link active text-light mb-4" aria-current="page" href="/login">Login</a>
          </li>
          <li className="nav-item ">
          <a className="nav-link active text-light mb-4 mx-3" aria-current="page" href="/signup">Sign Up</a>
        </li>
    </div>
  </div>
</nav>
    </>
  )
}
