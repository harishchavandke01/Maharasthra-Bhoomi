import React, { useState } from 'react';

function CropRecommend() {
  const [formData, setFormData] = useState({
    Nitrogen: '', Phosporus: '', Potassium: '', Temperature: '', Humidity: '', pH: '', Rainfall: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/recommend_crop', {  // Ensure the endpoint is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setResult(data.recommended_crop);  // Adjusted field name to match backend response
    } catch (error) {
      console.error(error);
      setResult('Something went wrong while predicting crop.');
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-success mb-3">Best suitable crop for your farm</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {['Nitrogen', 'Phosporus', 'Potassium', 'Temperature', 'Humidity', 'pH', 'Rainfall'].map((field) => (
          <div className="col-md-6" key={field}>
            <label htmlFor={field} className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="number"
              className="form-control"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-success">Get Recommendation</button>
        </div>
      </form>
      {result && (
        <div className="alert alert-success mt-4">
          Recommended Crop: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

export default CropRecommend;
