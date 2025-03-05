import numpy as np
import pickle
from sklearn.ensemble import IsolationForest

def train_isolation_forest(X_scaled, contamination=0.1):
    """
    Train Isolation Forest model for anomaly detection.
    
    Args:
        X_scaled (np.array): Scaled feature matrix
        contamination (float): Expected proportion of outliers
    
    Returns:
        tuple: Trained model and fitted model
    """
    # Initialize and train Isolation Forest
    model = IsolationForest(
        contamination=contamination, 
        random_state=42
    )
    model.fit(X_scaled)
    
    return model

def save_model(model, scaler, filepath='models/isolation_forest_model.pkl'):
    """
    Save trained model and scaler to pickle file.
    
    Args:
        model (IsolationForest): Trained Isolation Forest model
        scaler (StandardScaler): Feature scaler
        filepath (str): Path to save pickled model
    """
    with open(filepath, 'wb') as f:
        pickle.dump({
            'model': model,
            'scaler': scaler
        }, f)

def load_model(filepath='models/isolation_forest_model.pkl'):
    """
    Load saved model and scaler.
    
    Args:
        filepath (str): Path to pickled model
    
    Returns:
        dict: Loaded model and scaler
    """
    with open(filepath, 'rb') as f:
        return pickle.load(f)

def main():
    """
    Main function to train and save the model
    """
    from .data_preprocessing import prepare_training_data
    
    # Path to your training data
    filepath = 'data/ride_fares.csv'
    
    # Prepare data
    X_scaled, scaler = prepare_training_data(filepath)
    
    # Train model
    model = train_isolation_forest(X_scaled)
    
    # Save model
    save_model(model, scaler)
    
    print("Model trained and saved successfully!")

if __name__ == '__main__':
    main()