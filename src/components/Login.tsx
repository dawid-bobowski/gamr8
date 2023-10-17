import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Here you would normally send the username and password to your backend to get authenticated.
    // For demonstration purposes, I'll just simulate a successful login.

    // Example:
    // const response = await fetch('your-backend-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    //   headers: { 'Content-Type': 'application/json' }
    // });

    // const data = await response.json();

    // if (data.success) {
    //   onLoginSuccess();
    // } else {
    //   setError(data.message);
    // }

    if (username && password) {
      onLoginSuccess();
    } else {
      setError('Please provide valid credentials.');
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Login</h2>
              {error && <div className='alert alert-danger'>{error}</div>}
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
                <button className='btn btn-primary' onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
