import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import api from '../api';

interface RegisterValidateData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validateRegister = (data: RegisterValidateData) => {
  const { username, email, password, confirmPassword } = data;
  if (username === '') {
    return 'Username can not be empty.';
  }
  if (username.length < 3) {
    return 'Username should consist of at least 3 characters.';
  }
  if (email === '') {
    return 'Email can not be empty.';
  }
  if (!email.includes('@') || !email.includes('.')) {
    return 'Provide a proper email.';
  }
  if (password === '') {
    return 'Password can not be empty.';
  }
  // if (password.length < 8) {
  //   return 'Password should consist of at least 8 characters.';
  // }
  if (confirmPassword !== password) {
    return 'Passwords should be the same.';
  }
  return '';
}

const Register: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    const validateResult: string = validateRegister({
      username,
      email,
      password,
      confirmPassword,
    });
    setError(validateResult);
    if (validateResult !== '') return;
    try {
      const response = await api.post('/register', {
        username,
        email,
        password,
      });
      if (response.data.success) {
        navigate('/login');
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
              <h2 className='text-center mb-4'>Register</h2>
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
                      />
                  </label>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Email
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      />
                  </label>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Confirm Password
                    <input
                      type='password'
                      className='form-control'
                      id='confirm-password'
                      name='confirm-password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                  </label>
                </div>
                <button className='btn btn-primary' onClick={handleRegister} disabled={error !== '' || Boolean(!username || !email || !password || !confirmPassword)}>
                  Register
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

export default Register;
