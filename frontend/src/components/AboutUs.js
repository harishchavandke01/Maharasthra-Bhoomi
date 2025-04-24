import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mt-5 p-4" style={{ backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
            {/* Heading */}
            <h2 className="text-center text-success mb-5" style={{ fontWeight: 'bold' }}>About Us</h2>

            {/* Introduction Section */}
            <div className="text-center mb-5">
                <p className="lead" style={{ fontSize: '18px' }}>
                    Welcome to <span className="text-success" style={{ fontWeight: 'bold' }}>Maharashtra Bhoomi</span>! 🌾<br />
                    We help farmers predict their crop yields based on scientific factors like rainfall, area, soil quality, and seasons. 
                    Our goal is to boost agricultural success through smarter, data-driven farming.
                </p>
            </div>

            {/* Mission Section */}
            <div className="mb-5">
                <h4 className="text-muted mb-3">🌟 Our Mission</h4>
                <p style={{ fontSize: '16px' }}>
                    We aim to empower farmers by delivering accurate yield predictions. 
                    By planning better, farmers can maximize their harvest, optimize resource use, and contribute to a thriving agricultural economy.
                </p>
            </div>

            {/* Features Section */}
            <div className="mb-5">
                <h4 className="text-muted mb-3">🚀 What We Offer</h4>
                <ul className="list-unstyled" style={{ fontSize: '16px' }}>
                    <li>✅ Accurate crop yield prediction based on real data.</li>
                    <li>✅ Smart insights to help make informed farming decisions.</li>
                    <li>✅ Simple, user-friendly interface for everyone.</li>
                    <li>✅ In-depth analysis of environmental and soil factors.</li>
                </ul>
            </div>

            {/* Future Features Section */}
            <div className="mb-5">
                <h4 className="text-muted mb-3">🔮 What's Coming Next?</h4>
                <p style={{ fontSize: '16px' }}>
                    We’re working on exciting new features to make your experience even better:
                </p>
                <ul className="list-unstyled" style={{ fontSize: '16px' }}>
                    <li>🌱 Crop recommendations tailored to your soil and weather.</li>
                    <li>🌍 Detailed district-level agricultural insights.</li>
                    <li>☁️ Advanced integration of real-time weather and soil data.</li>
                    <li>📢 Instant alerts to adapt quickly to changing farming conditions.</li>
                </ul>
            </div>

            {/* Contact Info Section */}
            <div className="text-center">
                <h4 className="text-muted mb-3">📬 Contact Us</h4>
                <p style={{ fontSize: '16px' }}>
                    Got questions or feedback? We’d love to hear from you!
                </p>
                <p>
                    <strong>Email:</strong> <a href="mailto:support@maharathrabhoomi.com" className="text-success">support@maharathrabhoomi.com</a>
                </p>
                <p>
                    <strong>Phone:</strong> <a href="tel:+917499657836" className="text-success">+91 7499657836</a>
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
