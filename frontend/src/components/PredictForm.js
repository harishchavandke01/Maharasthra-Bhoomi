import React, { useState, useRef } from 'react';

const PredictForm = () => {
    const [formData, setFormData] = useState({
        Rainfall: '',
        Area: '',
        District_Name: '',
        Season_Encoded: '',
        Soil_Quality_Encoded: '',
        Crop: '',
    });

    const [result, setResult] = useState(null);
    const resultRef = useRef(null); // Reference for scrolling

    const districts = [
        'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana',
        'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur',
        'Latur', 'Mumbai', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Parbhani',
        'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane',
        'Wardha', 'Washim', 'Yavatmal'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data:", formData);

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data.predicted_production);

            // Scroll down to the result card
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Enter Details to Predict Crop Yield</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Rainfall" className="form-label">Rainfall (mm):</label>
                    <input
                        type="number"
                        className="form-control"
                        id="Rainfall"
                        name="Rainfall"
                        value={formData.Rainfall}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Area" className="form-label">Area (in Hector):</label>
                    <input
                        type="number"
                        className="form-control"
                        id="Area"
                        name="Area"
                        value={formData.Area}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="District_Name" className="form-label">District Name:</label>
                    <select
                        className="form-control"
                        id="District_Name"
                        name="District_Name"
                        value={formData.District_Name}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select District</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="Season_Encoded" className="form-label">Season:</label>
                    <select
                        className="form-control"
                        id="Season_Encoded"
                        name="Season_Encoded"
                        value={formData.Season_Encoded}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Season</option>
                        <option value="Rabi">Rabi</option>
                        <option value="Kharif">Kharif</option>
                        <option value="Whole Year">Whole Year</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="Soil_Quality_Encoded" className="form-label">Soil Quality:</label>
                    <select
                        className="form-control"
                        id="Soil_Quality_Encoded"
                        name="Soil_Quality_Encoded"
                        value={formData.Soil_Quality_Encoded}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Soil Quality</option>
                        <option value="Poor">Poor</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Good">Good</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="Crop" className="form-label">Crop:</label>
                    <select
                        className="form-control"
                        id="Crop"
                        name="Crop"
                        value={formData.Crop}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Crop</option>
                        <option value="Groundnut">Groundnut</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Rice">Rice</option>
                        <option value="Barley">Barley</option>
                        <option value="Gram">Gram</option>
                        <option value="Maize">Maize</option>
                        <option value="Mustard">Mustard</option>
                        <option value="Peas">Peas</option>
                        <option value="Pulses">Pulses</option>
                        <option value="Soybean">Soybean</option>
                        <option value="Sugarcane">Sugarcane</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {result && (
                <div ref={resultRef} className="mt-4 d-flex justify-content-center">
                    <div className="card" style={{ width: '20rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body mb-5">
                            <h5 className="card-title text-center" style={{ fontWeight: 'bold', color: '#007bff' }}>Total Production</h5>
                            <p className="card-text text-center" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                                {result.toFixed(3)} Quintals
                            </p>

                            <h5 className="card-title text-center" style={{ fontWeight: 'bold', color: '#007bff' }}>Crop Yield</h5>
                            <p className="card-text text-center" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                                {(result / formData.Area).toFixed(3)} Quintals per Hectare Area
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="container text-center mt-5">
                <footer className="bg-dark text-white ">
                    <p className="mb-0">&copy; 2025 Harish | Happy Coding!</p>
                </footer>
            </div>
        </div>
    );
};

export default PredictForm;
