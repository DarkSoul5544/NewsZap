import React from "react";

export default function Footer() {
  return (
    <footer className="">
          
          <>
  <div className="">
    <footer
      className="text-center text-lg-start text-white"
      style={{ backgroundColor: "black" }}
    >
      <section
        className="d-flex justify-content-between p-4"
        style={{ backgroundColor: "blue" }}
      >
      
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>
       
        <div>
          <a href="https://www.facebook.com/darksoulgg/" className="text-white me-4">
            <i className="fa fa-facebook-f" />
          </a>
          <a href="https://twitter.com/darksoul_gg" className="text-white me-4">
            <i className="fa fa-twitter" />
          </a>
          {/* <a href="/" className="text-white me-4">
            <i className="fa fa-google" />
          </a> */}
          <a href="https://www.instagram.com/vishalgupta.222/" className="text-white me-4">
            <i className="fa fa-instagram" />
          </a>
          <a href="https://www.linkedin.com/in/vishalgupta9" className="text-white me-4">
            <i className="fa fa-linkedin" />
          </a>
          <a href="https://github.com/DarkSoul5544" className="text-white me-4">
            <i className="fa fa-github" />
          </a>
        </div>
      </section>
     
      <section className="">
        <div className="container text-center text-md-start mt-5">
        
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">NewsZap</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
              NewsZap is a top news website that offers the latest news and updates from around the world
              </p>
            </div>
           
            {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Products</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <a href="/" className="text-white">
                  NewsZap
                </a>
              </p>
              <p>
                <a href="/" className="text-white">
                  NewsZap
                </a>
              </p>
              <p>
                <a href="/" className="text-white">
                  NewsZap
                </a>
              </p>
              <p>
                <a href="/" className="text-white">
                  NewsZap
                </a>
              </p>
            </div> */}
           
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              {/* <p>
                <a href="/" className="text-white">
                  Your Account
                </a>
              </p> */}
              <p>
                <a href="/AboutUs" className="text-white">
                  About US
                </a>
              </p>
              <p>
                <a href="/PrivacyPolicy" className="text-white">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/Help" className="text-white">
                  Help
                </a>
              </p>
            </div>
         
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <i className="fa fa-home mr-3" /> Rajendra Nagar, Bareilly
              </p>
              <p>
                <i className="fa fa-envelope mr-3" /> newszap@gmail.com
              </p>
              <p>
                <i className="fa fa-phone mr-3" /> +91 8923859226
              </p>
            </div>
          </div>
        </div>
      </section>
     
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <p className="text-white">
        © 2024 Copyright: NewsZap
        </p>
      </div>
      
    </footer>
    
  </div>
</>

    </footer>
  );
}