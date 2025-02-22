import React, { useState } from "react";

const App: React.FC = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [rideDuration, setRideDuration] = useState("");
  const [baseFare, setBaseFare] = useState("");
  const [surgeMultiplier, setSurgeMultiplier] = useState("1.0");
  const [finalFare, setFinalFare] = useState("");
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
          start_location: startLocation, 
          end_location: endLocation, 
          distance_km: parseFloat(distance),
          ride_duration_min: parseFloat(rideDuration),
          base_fare: parseFloat(baseFare),
          surge_multiplier: parseFloat(surgeMultiplier),
          final_fare: parseFloat(finalFare)
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
          <input type="text" placeholder="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
          <input type="text" placeholder="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
          <input type="number" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
          <input type="number" placeholder="Ride Duration (min)" value={rideDuration} onChange={(e) => setRideDuration(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
          <input type="number" placeholder="Base Fare (₹)" value={baseFare} onChange={(e) => setBaseFare(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
          <input type="number" step="0.1" placeholder="Surge Multiplier" value={surgeMultiplier} onChange={(e) => setSurgeMultiplier(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
          <input type="number" placeholder="Final Fare (₹)" value={finalFare} onChange={(e) => setFinalFare(e.target.value)} className="w-full p-3 bg-gray-700 rounded-lg text-white mb-2" />
        </div>

        <button onClick={checkFare} className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-lg mt-2 font-bold" disabled={loading}>
          {loading ? "Checking..." : "Check Fare"}
        </button>

        {result && (
          <p className="mt-4 text-center font-semibold text-lg">{result}</p>
        )}
      </div>
    </div>
  );
};

export default App;
