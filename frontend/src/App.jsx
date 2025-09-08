import { useState } from "react";

function App() {
  const [weightAir, setWeightAir] = useState("");
  const [weightWater, setWeightWater] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight_air: parseFloat(weightAir),
          weight_water: parseFloat(weightWater),
        }),
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Could not connect to backend. Make sure server is running.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617038126621-ecae2f54d693?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          background: "rgba(231, 200, 159, 0.9)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
          border: "4px solid transparent",
          backgroundImage:
            "linear-gradient(white, white), linear-gradient(45deg, #d4af37, #ffd700, #ffec8b)",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
        }}
      >
        {/* Crown Icon */}
        <div style={{ fontSize: "50px", color: "#d4af37", marginBottom: "10px" }}>
          👑
        </div>
   
        <h1 style={{ marginBottom: "20px", color: "#6a0dad" }}>
          Gold Purity Calculator
        </h1>
<form onSubmit={handleSubmit}>
        <input
  type="number"
  placeholder="Weight in Air (g)"
  value={weightAir}
  onChange={(e) => setWeightAir(e.target.value)}
  required
  style={{
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "2px solid #d4af37",
    boxSizing: "border-box", // ✅ prevents overflow
  }}
/>
          <input
  type="number"
  placeholder="Weight in Water (g)"
  value={weightWater}
  onChange={(e) => setWeightWater(e.target.value)}
  required
  style={{
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "2px solid #d4af37",
    boxSizing: "border-box", // ✅ prevents overflow
  }}
/>
         <button
  type="submit"
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    background: "linear-gradient(90deg, #d4af37, #ffd700)",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    transition: "0.3s",
    boxSizing: "border-box", // ✅ keeps inside the box
  }}
>
  Calculate
</button>
           
        </form>

        {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#fff",
              borderRadius: "8px",
              border: "2px solid #d4af37",
            }}
          >
            <p>
              <strong>Density:</strong> {result.density.toFixed(2)} g/cm³
            </p>
            <p>
              <strong>Purity:</strong> {result.purity.toFixed(2)}%
            </p>
            <p>
              <strong>Karat:</strong> {result.karat.toFixed(2)}K
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
