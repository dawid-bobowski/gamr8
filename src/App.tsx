import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FC } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Header from './components/Header';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div
          className='App'
          style={{ backgroundColor: '#191825' }}
        >
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path='/register' element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path='/profile' element={<PrivateRoute />}>
                <Route index element={<UserProfile />} />
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
