import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // animation library
import logo from '../assets/logo1.jpg';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar navbar-expand-lg sticky-top py-3"
      style={{ backgroundColor: '#e9fbe5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <motion.img 
            src={logo} 
            alt="Logo"
            style={{ width: '45px', height: '45px', marginRight: '10px', borderRadius: '50%' }}
            whileHover={{ scale: 1.1 }}
          />
          <span className="fw-bold" style={{ fontSize: '24px', color: '#228B22' }}>
            Maharashtra Bhoomi
          </span>
        </Link>

        {/* Toggler */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/about" style={{ color: '#2e7d32' }}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/contact" style={{ color: '#2e7d32' }}>Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-success" to="/predict">Predict</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-success" to="/crop-recommend">Crop Recommend</Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
