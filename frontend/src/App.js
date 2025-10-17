import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({ name: "", text: "", x: 20, y: 20 });

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/overlays");
    setOverlays(res.data);
  };

  const addOverlay = async () => {
    await axios.post("http://127.0.0.1:5000/api/overlays", newOverlay);
    fetchOverlays();
    setNewOverlay({ name: "", text: "", x: 20, y: 20 });
  };

  const deleteOverlay = async (name) => {
    await axios.delete(`http://127.0.0.1:5000/api/overlays/${name}`);
    fetchOverlays();
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>🎥 Livestream with Overlays</h2>

      {/* Video simulated via RTSP.me */}
      <iframe
        title="video"
        src="https://rtsp.me/embed/rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"
        width="640"
        height="360"
        allow="autoplay"
      ></iframe>

      <div>
        {overlays.map((o) => (
          <div
            key={o.name}
            style={{
              position: "absolute",
              top: o.y,
              left: o.x,
              color: "red",
              fontWeight: "bold",
            }}
          >
            {o.text}
          </div>
        ))}
      </div>

      <h3>Add Overlay</h3>
      <input
        placeholder="Name"
        value={newOverlay.name}
        onChange={(e) => setNewOverlay({ ...newOverlay, name: e.target.value })}
      />
      <input
        placeholder="Text"
        value={newOverlay.text}
        onChange={(e) => setNewOverlay({ ...newOverlay, text: e.target.value })}
      />
      <input
        type="number"
        placeholder="X"
        value={newOverlay.x}
        onChange={(e) => setNewOverlay({ ...newOverlay, x: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Y"
        value={newOverlay.y}
        onChange={(e) => setNewOverlay({ ...newOverlay, y: Number(e.target.value) })}
      />
      <button onClick={addOverlay}>Save Overlay</button>

      <h4>Saved Overlays</h4>
      <ul>
        {overlays.map((o) => (
          <li key={o.name}>
            {o.name}: {o.text}
            <button onClick={() => deleteOverlay(o.name)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
