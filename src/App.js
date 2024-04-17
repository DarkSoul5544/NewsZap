import React from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <News />
      <Footer/>
    </div>
  );
}

export default App;