import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 

import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='App' style={{ backgroundColor: '#191825' }}>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<PublicRoute />}>
                <Route index element={<Login  />} />
              </Route>
              <Route path='/register' element={<PublicRoute />}>
                <Route index element={<div>Register Page</div>} />
              </Route>
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