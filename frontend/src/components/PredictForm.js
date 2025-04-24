import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from 'framer-motion';

// Fix default Marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

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
  const [graphData, setGraphData] = useState([]);
  const resultRef = useRef(null);

  const [mapInfo, setMapInfo] = useState({
    center: [19.7515, 75.7139],
    zoom: 7,
    markers: []
  });

  const districtCoordinates = {
    Ahmednagar: [19.0948, 74.7477], Akola: [20.7096, 77.0085], Amravati: [20.9374, 77.7796],
    Aurangabad: [19.8762, 75.3433], Beed: [18.9891, 75.7601], Bhandara: [21.1667, 79.65],
    Buldhana: [20.5293, 76.1804], Chandrapur: [19.9615, 79.2961], Dhule: [20.9042, 74.7749],
    Gadchiroli: [20.1926, 80.0035], Gondia: [21.4602, 80.192], Hingoli: [19.719, 77.1474],
    Jalgaon: [21.0077, 75.5626], Jalna: [19.841, 75.8864], Kolhapur: [16.705, 74.2433],
    Latur: [18.4088, 76.5604], Mumbai: [19.076, 72.8777], Nagpur: [21.1458, 79.0882],
    Nanded: [19.1383, 77.321], Nandurbar: [21.3662, 74.239], Nashik: [20.0059, 73.791],
    Osmanabad: [18.186, 76.0419], Parbhani: [19.2704, 76.7601], Pune: [18.5204, 73.8567],
    Raigad: [18.5236, 73.2896], Ratnagiri: [16.9902, 73.312], Sangli: [16.8544, 74.5815],
    Satara: [17.6805, 74.0183], Sindhudurg: [16.1236, 73.691], Solapur: [17.6599, 75.9064],
    Thane: [19.2183, 72.9781], Wardha: [20.7381, 78.5967], Washim: [20.1114, 77.1334],
    Yavatmal: [20.3893, 78.1306]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));

    if (name === 'District_Name' && districtCoordinates[value]) {
      setMapInfo({
        center: districtCoordinates[value],
        zoom: 10,
        markers: [{ position: districtCoordinates[value], label: value }]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setResult(data.predicted_production);

      const area = parseFloat(formData.Area);
      const production = parseFloat(data.predicted_production);
      const yieldPerHectare = production / area;

      setGraphData([
        { name: 'Area (Ha)', value: area },
        { name: 'Production (Qtls)', value: production },
        { name: 'Yield (Qtls/Ha)', value: parseFloat(yieldPerHectare.toFixed(2)) },
      ]);

      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const ChangeMapCenter = ({ center }) => {
    const map = useMap();
    map.flyTo(center, 10, { duration: 1.5 });
    return null;
  };

  const downloadPDF = () => {
    const input = document.getElementById('pdfContent');

    if (!input) {
      console.error("PDF content section not found!");
      return;
    }

    html2canvas(input, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('crop_prediction_report.pdf');
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  };

  const customMarker = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="container mt-5">
      <motion.h2 
        className="text-center mb-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Enter Details to Predict Crop Yield
      </motion.h2>

      <div className="d-flex flex-wrap justify-content-between">

        {/* Left - Form */}
        <motion.div
          className="flex-grow-1 me-4 p-4"
          style={{ minWidth: '300px', maxWidth: '500px', borderRadius: '12px', backgroundColor: '#f7fff7', boxShadow: '0 6px 12px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Rainfall (mm):</label>
              <input type="number" className="form-control" name="Rainfall" value={formData.Rainfall} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Area (in Hectare):</label>
              <input type="number" className="form-control" name="Area" value={formData.Area} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">District Name:</label>
              <select className="form-control" name="District_Name" value={formData.District_Name} onChange={handleChange} required>
                <option value="">Select District</option>
                {Object.keys(districtCoordinates).map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Season:</label>
              <select className="form-control" name="Season_Encoded" value={formData.Season_Encoded} onChange={handleChange} required>
                <option value="">Select Season</option>
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
                <option value="Whole Year">Whole Year</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Soil Quality:</label>
              <select className="form-control" name="Soil_Quality_Encoded" value={formData.Soil_Quality_Encoded} onChange={handleChange} required>
                <option value="">Select Soil Quality</option>
                <option value="Poor">Poor</option>
                <option value="Moderate">Moderate</option>
                <option value="Good">Good</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Crop:</label>
              <select className="form-control" name="Crop" value={formData.Crop} onChange={handleChange} required>
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
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </motion.div>

        {/* Right - Graph */}
        {graphData.length > 0 && (
          <motion.div
            className="flex-grow-1 p-4"
            style={{ minWidth: '300px', maxWidth: '600px', borderRadius: '12px', backgroundColor: '#f0f4ff', boxShadow: '0 6px 12px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h4 className="text-center mb-4">Crop Production Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

      </div>

      {/* Map Section */}
      <motion.div
        className="mt-5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="text-center mb-3">Selected District Location</h4>
        <MapContainer center={mapInfo.center} zoom={mapInfo.zoom} style={{ height: '400px', width: '100%' }}>
          <ChangeMapCenter center={mapInfo.center} />
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mapInfo.markers.map((marker, idx) => (
            <Marker key={idx} position={marker.position} icon={customMarker}>
              <Popup>
                {marker.label}<br />
                Lat: {marker.position[0].toFixed(4)}, Lon: {marker.position[1].toFixed(4)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>

      {/* Result Section */}
      {result && (
        <motion.div
          className="mt-4 d-flex justify-content-center flex-column align-items-center"
          ref={resultRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div id="pdfContent" className="card p-4 mb-3" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
            <h4 className="text-center mb-3">Crop Yield Prediction Report</h4>
            <p><strong>District:</strong> {formData.District_Name}</p>
            <p><strong>Crop:</strong> {formData.Crop}</p>
            <p><strong>Season:</strong> {formData.Season_Encoded}</p>
            <p><strong>Soil Quality:</strong> {formData.Soil_Quality_Encoded}</p>
            <p><strong>Rainfall:</strong> {formData.Rainfall} mm</p>
            <p><strong>Area:</strong> {formData.Area} Hectares</p>
            <hr />
            <h5>Predicted Production:</h5>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>{result} Quintals</p>
          </div>

          <motion.button
            onClick={downloadPDF}
            className="btn btn-success"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download PDF
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PredictForm;
