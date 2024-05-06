import React from "react";
import { Link } from "react-router-dom";



const SignupPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:3307/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        // Handle successful signup
        const data = await response.json();
        console.log('User signed up successfully:', data);
      } else {
        // Handle error
        const error = await response.json();
        console.error('Error signing up user:', error);
      }
    } catch (error) {
      // Handle error
      console.error('Error signing up user:', error);
    }
  };
  return (
    <div className="container mt-4">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(95,46,195,1) 35%, rgba(0,212,255,1) 100%)',
              }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase mb-5">Signup</h2>
                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="text"
                        id="typetext"
                        className="form-control form-control-lg bg-secondary"
                        placeholder="Name"
                      />
                    </div>
                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg bg-secondary"
                        placeholder="Email"
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg bg-secondary"
                        placeholder="Password"
                      />
                    </div>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-light btn-lg px-5 my-5"
                      type="submit" onSubmit={handleSubmit}
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
      </section>
    </div>
  );
};



export default SignupPage;

