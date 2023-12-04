import { FC, useState, useEffect } from 'react';
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
      return;
    }
    try {
      const response = await api.post('/login', {
        username,
        password,
      });
      if (response.data.success) {
        const token = response.data.accessToken;
        const user = response.data.user;
        login(token, user);
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

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => setError(''), 3000);
    }
  }, [error]);

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Login</h2>
              <div className='d-flex flex-column align-items-center'>
                <div className='mb-3'>
                  <label className='form-label'>
                    Username
                    <input
                      type='text'
                      className='form-control'
                      id='username'
                      name='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete='username'
                      />
                  </label>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Password
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete='current-password'
                      />
                  </label>
                </div>
                <button className='btn btn-primary' onClick={handleLogin} disabled={Boolean(!username || !password || error)}>
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
