import React from "react";

export default function Footer() {
  return (
    <div className="bg-dark text-light text-center py-3 justify-content-center">
      <div className="container justify-content-center">
        <div className="row justify-content-center">
          <div className="col-md-4 ">
            <h5>NewsZap</h5>
            <p>Made By Vishal Gupta</p>
            <p>All Rights Reserved</p>
          </div>
          <div className="col-md-5 d-flex justify-content-end ">
            <ul className="list-unstyled ">
              <h5>Connect with us</h5>

              <li>
                <a
                  href="https://twitter.com/darksoul_gg"
                  className="text-light"
                >
                  <i className="fa fa-twitter me-2"></i>Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vishalgupta.222/"
                  className="text-light"
                >
                  <i className="fa fa-instagram me-2"></i>Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/vishalgupta9"
                  className="text-light"
                >
                  <i className="fa fa-linkedin me-2"></i>LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
