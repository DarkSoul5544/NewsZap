// SignupPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData({
    ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post("/signup", formData)
    .then((response) => {
        setSuccess(true);
        setError(null);
        console.log(response);
        // Handle successful signup
        // You can also redirect the user to the login page or dashboard
        window.location.href = "/login";
      })
    .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
        setSuccess(false);
        console.log(error);
        // Handle error
      });
  };

  return (
    <div className="container mt-4">
      <section className="gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(95,46,195,1) 35%, rgba(0,212,255,1) 100%)',
                }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase mb-5">Signup</h2>
                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg bg-secondary"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg bg-secondary"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg bg-secondary"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="alert alert-success" role="alert">
                        Signup successful! Please login to continue.
                      </div>
                    )}

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-light btn-lg px-5 my-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      SignUp
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

                    <div>
                      <p className="mb-0">
                        {" "}
                        <Link to="/login" className="text-white-50 fw-bold">
                          Already have an account? Login
                        </Link>
                      </p>
                    </div>
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

export default SignupPage;