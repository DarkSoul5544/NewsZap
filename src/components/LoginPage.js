
import React from "react";
import { Link } from "react-router-dom";


const LoginPage = () => {
 
  return (
    <div className="text-center p-2 text-white bg-opacity-75">
      <section className="gradient-custom">
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ backgroundImage: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(95,46,195,1) 35%, rgba(0,212,255,1) 100%)'}}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5 my-3">
                      Please enter your Email and Password!
                    </p>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg bg-secondary" placeholder="Email" />
                    </div>

                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg bg-secondary" placeholder="Password" />
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit" >
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fa fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fa fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fa fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;