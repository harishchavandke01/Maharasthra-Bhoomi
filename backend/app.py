from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS 
import pandas as pd

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the trained model and encoders
model = joblib.load("model/xgboost_crop_yield_model.pkl")
encoder_district = joblib.load("model/ordinal_encoder_district.pkl")
encoder_season = joblib.load("model/ordinal_encoder_season.pkl")
encoder_soil = joblib.load("model/ordinal_encoder_soil.pkl")
scaler = joblib.load("model/scaler.pkl")

# Define all possible crops for encoding
crop_categories = ["Crop_Barley", "Crop_Cotton", "Crop_Gram", "Crop_Groundnut",
                   "Crop_Maize", "Crop_Mustard", "Crop_Peas", "Crop_Pulses",
                   "Crop_Rice", "Crop_Soybean", "Crop_Sugarcane"]

@app.route("/")
def home():
    return jsonify({"message": "Crop Yield Prediction API is running!"})

@app.route("/predict", methods=["POST"])  # Ensure the method is POST
def predict():
    try:
        # Get data from request
        data = request.get_json()

        # Validate input
        required_fields = ["Rainfall", "Area", "District_Name", "Season_Encoded", "Soil_Quality_Encoded", "Crop"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing fields in request"}), 400

        # Encode categorical features
        district_encoded = encoder_district.transform([[data["District_Name"]]])[0][0]
        season_encoded = encoder_season.transform([[data["Season_Encoded"]]])[0][0]
        soil_encoded = encoder_soil.transform([[data["Soil_Quality_Encoded"]]])[0][0]
        

        # Initialize all crop columns with 0
        crop_input = {crop: 0 for crop in crop_categories}
        selected_crop = "Crop_" + data["Crop"]
        if selected_crop in crop_input:
            crop_input[selected_crop] = 1  # Set 1 for the present crop

        # Create input feature array
        input_features = np.array([
            data["Rainfall"],
            data["Area"],
            district_encoded,
            season_encoded,
            soil_encoded
        ] + list(crop_input.values())).reshape(1, -1)

        # Apply scaling
        # input_features = scaler.transform(input_features)
        feature_names = ["Rainfall", "Area", "District_Name", "Season_Encoded", "Soil_Quality_Encoded"] + crop_categories
        input_df = pd.DataFrame(input_features, columns=feature_names)
        input_features = scaler.transform(input_df)

        # Predict Production
        predicted_production = model.predict(input_features)

        # Convert NumPy float to Python float
        return jsonify({"predicted_production": float(predicted_production[0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
