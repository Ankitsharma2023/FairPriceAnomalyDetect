import React, { useState } from "react";

const App: React.FC = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [fare, setFare] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const checkFare = async () => {
    setLoading(true);
    setResult(null);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/check-fare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          start: startLocation, 
          end: endLocation, 
          distance: 5,  // Hardcoded for now
          time: 10,     // Hardcoded for now
          fare: parseFloat(fare) 
        }),
      });
  
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult("⚠️ Error connecting to server.");
      console.error("Error:", error);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-orange-500">Ride Fare Checker</h2>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Start Location"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2"
          />
          <input
            type="text"
            placeholder="End Location"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2"
          />
          <input
            type="number"
            placeholder="Fare (₹)"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2"
          />
        </div>

        <button 
          onClick={checkFare} 
          className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-lg mt-2 font-bold"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Fare"}
        </button>

        {result && (
          <p className="mt-4 text-center font-semibold text-lg">
            {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
