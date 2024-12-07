import React, { useState } from 'react';
import './LoginTurf.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import NavBar from './NavBar';

const LoginTurf = () => {
  const [formData, setFormData] = useState({
    turfName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/turfs/login', formData);

      if (response.status === 200) {
        // Store any necessary data in local storage or context
        navigate('/req'); // Update this route as needed
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid login credentials. Please try again.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar/>
      <div className="bodyhel">
        <div className="containerfan" id="container">
          <div className="form-container sign-in-container">
            <div className="tvk">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input
                type="text"
                id="turfName"
                placeholder="Turf Name"
                className="input-fieldpas"
                value={formData.turfName}
                onChange={handleChange}
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input-fieldpas"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="input-fieldpas"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit" className="submit-buttonpap" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginTurf;
