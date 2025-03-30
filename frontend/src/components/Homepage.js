import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <>
            <div className="container text-center mt-5">
                <h1 className="display-4 text-success">Welcome To Maharasthra Bhoomi</h1>
                <p className="lead">Enter crop details to predict the yield in quintals.</p>
                <Link to="/predict" className="btn btn-success btn-lg">Start Prediction →</Link>
            </div>

            {/* Image added after the div with styling */}
            <div className="text-center mt-4">
                <img
                    src="/assets/farm.jpg"
                    alt="Agriculture"
                    className="img-fluid rounded border shadow-sm"
                    style={{ width: '90%', height: 'auto' }}
                />
            </div>

            {/* Farmer reviews section */}
            <div className="container mt-5">
                <h2 className="text-center text-success">Farmer Reviews</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ramesh Gaikwad, Dhule</h5>
                                <p className="card-text">"The crop yield prediction helped me plan my harvest better. It's a great tool for farmers!"</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pravin Gadekar, Ahmednagar</h5>
                                <p className="card-text">"I was able to optimize my farming practices after using the prediction model. Highly recommend it!"</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Vijay Kumar, Nashik</h5>
                                <p className="card-text">"This platform made a huge difference in our farming decisions."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer section with copyright */}
            <div className="container text-center mt-5">
                <footer className="bg-dark text-white ">
                    <p className="mb-0">&copy; 2025 Harish | Happy Coding!</p>
                </footer>
            </div>
        </>
    );
};

export default Homepage;
