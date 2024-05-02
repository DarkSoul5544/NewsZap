import React from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PrivacyPolicy from  "./components/PrivacyPolicy";
import AboutUs from './components/AboutUs';
import Help from './components/Help';
import TopPage from './components/TopPage';
import PremiumPage from './components/PremiumPage';
import HomePage from './components/HomePage';


function App() {
 
  

  return (
    <div className="App"
    style={{ backgroundColor: "#BED7DC" }}>
  <Navbar />
      <Router>
        <Routes>
        <Route path="/" element={ <HomePage />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </Router>
      <TopPage />
      <Footer/>
    </div>
  );
}
export default App;