import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const nameRef = useRef(null);

  React.useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Signup Page</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" ref={nameRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
        <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default SignupPage;