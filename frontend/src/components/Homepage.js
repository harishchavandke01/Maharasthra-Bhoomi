import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // for animations

const Homepage = () => {
    return (
        <div style={{ backgroundColor: '#f8fdf5', minHeight: '100vh', paddingBottom: '50px' }}>
            {/* Welcome Section */}
            <motion.div 
                className="container text-center pt-5"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="display-4 text-success fw-bold">
                    🌾 Welcome to Maharashtra Bhoomi
                </h1>
                <p className="lead mt-3" style={{ fontSize: '20px' }}>
                    Predict your crop yield & plan smarter for a better harvest!
                </p>
                <Link to="/predict" className="btn btn-lg btn-success mt-4" style={{ padding: '10px 30px', fontSize: '18px' }}>
                    🚀 Start Prediction
                </Link>
            </motion.div>

            {/* Image Section */}
            <motion.div 
                className="text-center mt-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <img
                    src="/assets/farm.jpg"
                    alt="Agriculture Field"
                    className="img-fluid rounded-4 border shadow"
                    style={{ width: '85%', maxHeight: '500px', objectFit: 'cover' }}
                />
            </motion.div>

            {/* Reviews Section */}
            <div className="container mt-5">
                <motion.h2 
                    className="text-center text-success mb-4 fw-semibold"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    💬 What Farmers Are Saying
                </motion.h2>
                <div className="row g-4">
                    {/* Farmer 1 */}
                    <motion.div 
                        className="col-md-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#eaffea' }}>
                            <div className="card-body">
                                <h5 className="card-title text-success">🌿 Ramesh Gaikwad, Dhule</h5>
                                <p className="card-text">"This tool helped me plan my crops better and increase my profits. Truly a game-changer!"</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Farmer 2 */}
                    <motion.div 
                        className="col-md-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#eaffea' }}>
                            <div className="card-body">
                                <h5 className="card-title text-success">🌿 Pravin Gadekar, Ahmednagar</h5>
                                <p className="card-text">"I made smarter decisions for sowing and harvesting. Very reliable predictions."</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Farmer 3 */}
                    <motion.div 
                        className="col-md-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#eaffea' }}>
                            <div className="card-body">
                                <h5 className="card-title text-success">🌿 Vijay Kumar, Nashik</h5>
                                <p className="card-text">"Saved me from a bad season by warning about poor soil moisture early. Amazing support!"</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
