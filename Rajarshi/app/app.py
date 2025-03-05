from flask import Flask, render_template, request, jsonify
from src.anomaly_detector import RideFareAnomalyDetector

app = Flask(__name__)

# Initialize anomaly detector
anomaly_detector = RideFareAnomalyDetector()

@app.route('/')
def index():
    """
    Render the main index page
    """
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict_anomaly():
    """
    Predict ride fare anomaly
    
    Expected JSON input:
    {
        'pickup_distance': float,
        'drop_distance': float,
        'fare': float
    }
    """
    try:
        data = request.get_json()
        
        # Extract features
        pickup_distance = float(data.get('pickup_distance', 0))
        drop_distance = float(data.get('drop_distance', 0))
        fare = float(data.get('fare', 0))
        
        # Predict anomaly
        result = anomaly_detector.predict(
            pickup_distance, 
            drop_distance, 
            fare
        )
        
        return jsonify({
            'is_anomaly': result['is_anomaly'],
            'confidence': float(result['confidence']),
            'message': 'Anomaly detected!' if result['is_anomaly'] else 'Normal fare'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Error processing request'
        }), 400

if __name__ == '__main__':
    app.run(debug=True)