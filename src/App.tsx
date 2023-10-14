import React, { useEffect } from 'react';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 

import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#191825' }}>
      <header>
        <Header />
      </header>
      <main>
        <MainSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;