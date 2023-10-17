import React, { useEffect } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 

import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import Login from './components/Login';



const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#191825' }}>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <MainSection />
            } />
            <Route path="/login" element={
              <Login onLoginSuccess={() => {
                // handle login success logic
              }} />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;