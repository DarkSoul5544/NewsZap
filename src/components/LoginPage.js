import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const emailRef = useRef(null);

  React.useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" ref={emailRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/signup" className="btn btn-link">Don't have an account? Sign up</Link>
      </form>
    </div>
  );
};

export default LoginPage;