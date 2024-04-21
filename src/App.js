import React, { useState, useEffect } from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';


function App() {
  const [showFooter, setShowFooter] = useState(false);
  const user = null;
  return (
    <div className="App"
    style={{ backgroundColor: "#adb5bd" }}>
      <Navbar user={user}/>
      <Router>
        <Routes>
          <Route path="/" element={<NewsWrapper showFooter={setShowFooter} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
      {showFooter && <Footer/>}
    </div>
  );
}

function NewsWrapper({ showFooter }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      showFooter(true);
    } else {
      showFooter(false);
    }
  }, [location, showFooter]);

  return <News />;
}

export default App;