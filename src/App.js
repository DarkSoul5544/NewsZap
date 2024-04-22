import React, { useState, useEffect } from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PrivacyPolicy from  "./components/PrivacyPolicy";
import AboutUs from './components/AboutUs';
import Help from './components/Help';
import TopPage from './components/TopPage';


function App() {
  const [showFooter, setShowFooter] = useState(true);
  const user = null;
  const excludePages = ['/login', '/signup'];

  return (
    <div className="App"
    style={{ backgroundColor: "#BED7DC" }}>
      <Navbar user={user}/>
      <Router>
        <Routes>
          <Route path="/" element={<NewsWrapper showFooter={setShowFooter} excludePages={excludePages} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Help" element={<Help />} />
        </Routes>
      </Router>
      <TopPage />
      {showFooter && <Footer/>}
    </div>
  );
}

function NewsWrapper({ showFooter, excludePages }) {
  const location = useLocation();

  useEffect(() => {
    if (!excludePages.includes(location.pathname)) {
      showFooter(true);
    } else {
      showFooter(false);
    }
  }, [location, showFooter, excludePages]);

  return <News />;
}
export default App;