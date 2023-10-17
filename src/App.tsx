import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 

import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthContext';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App" style={{ backgroundColor: '#191825' }}>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<MainSection />} />
              <Route path='/login' element={<Login  />} />
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
                {/* Other child routes of dashboard go here */}
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;