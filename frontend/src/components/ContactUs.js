import React from 'react';

const ContactUs = () => {
    return (
        <div className="container my-5">
            {/* Title */}
            <div className="text-center mb-5">
                <h2 className="text-success fw-bold">Contact Us</h2>
                <p className="text-muted">We would love to hear from you! Reach out for any queries, suggestions, or support.</p>
            </div>

            {/* Contact Info Section */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-center text-success mb-4">Our Contact Details</h5>
                            <p className="mb-2"><strong>Email:</strong> <a href="mailto:support@maharashtrabhoomi.com" className="text-success text-decoration-none">support@maharashtrabhoomi.com</a></p>
                            <p><strong>Phone:</strong> <a href="tel:+917499657836" className="text-success text-decoration-none">+91 7499657836</a></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="text-center text-success mb-4">Send Us a Message</h5>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" id="name" name="name" className="form-control" placeholder="Enter your name" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea id="message" name="message" rows="5" className="form-control" placeholder="Enter your message" required></textarea>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success btn-lg">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;
