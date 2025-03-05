import numpy as np
import pickle

class RideFareAnomalyDetector:
    def __init__(self, model_path='models/isolation_forest_model.pkl'):
        """
        Initialize anomaly detector with pre-trained model
        
        Args:
            model_path (str): Path to saved model
        """
        with open(model_path, 'rb') as f:
            model_data = pickle.load(f)
            self.model = model_data['model']
            self.scaler = model_data['scaler']
    
    def predict(self, pickup_distance, drop_distance, fare):
        """
        Predict if a ride fare is an anomaly
        
        Args:
            pickup_distance (float): Distance for pickup
            drop_distance (float): Distance for drop
            fare (float): Fare amount
        
        Returns:
            dict: Prediction results
        """
        # Prepare features
        features = np.array([
            [pickup_distance, drop_distance, fare]
        ])
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Predict
        prediction = self.model.predict(features_scaled)
        
        # -1 indicates anomaly, 1 indicates normal
        is_anomaly = prediction[0] == -1
        
        return {
            'is_anomaly': bool(is_anomaly),
            'confidence': self.model.decision_function(features_scaled)[0]
        }
    
    def batch_predict(self, features):
        """
        Predict anomalies for multiple samples
        
        Args:
            features (np.array): Array of features
        
        Returns:
            np.array: Anomaly predictions
        """
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Predict
        return self.model.predict(features_scaled)