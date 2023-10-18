import { FC, useState } from 'react';
import { AxiosError } from 'axios';

import { useAuth } from '../auth/useAuth';
import api from '../api';

const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setError('Please provide valid credentials.');
    }
    try {
      const response = await api.post('/login', {
        username,
        password,
      });
      if (response.data.success) {
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        login(token, response.data.user);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      let errorMessage = `Error sending request: `;
      if (error instanceof AxiosError && error.response) {
        errorMessage += error.response.data.message;
      } else {
        errorMessage += error;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Login</h2>
              <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='d-grid'>
                <button
                  className='btn btn-primary'
                  onClick={handleLogin}
                >
                  Login
                </button>
                {error && <div className='alert alert-danger'>{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
