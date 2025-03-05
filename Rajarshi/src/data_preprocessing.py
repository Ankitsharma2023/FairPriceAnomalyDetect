import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def load_data(filepath):
    filepath = ""
    df = pd.read_csv(filepath)
    return df

def preprocess_data(df):
    """
    Preprocess features for anomaly detection.
    
    Args:
        df (pd.DataFrame): Input dataframe with ride fare data
    
    Returns:
        np.array: Preprocessed features for model training
    """
    # Select relevant features
    features = ['pickup_distance', 'drop_distance', 'fare']
    
    # Handle missing values
    df = df.dropna(subset=features)
    
    # Extract features
    X = df[features].values
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, scaler

def prepare_training_data(filepath):
    """
    Prepare data for model training
    
    Args:
        filepath (str): Path to CSV file
    
    Returns:
        tuple: Scaled features and scaler
    """
    # Load data
    df = load_data(filepath)
    
    # Preprocess data
    X_scaled, scaler = preprocess_data(df)
    
    return X_scaled, scaler