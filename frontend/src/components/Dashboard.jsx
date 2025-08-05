import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [counts, setCounts] = useState({
    clubs: 0,
    players: 0,
    matches: 0,
    tournaments: 0,
    tickets: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/counts")
      .then(res => setCounts(res.data))
      .catch(err => console.error("Error fetching dashboard counts:", err));
  }, []);

  const cardStyle = {
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  };

  const handleHover = (e, isHovering) => {
    e.currentTarget.style.transform = isHovering ? "scale(1.05)" : "scale(1)";
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-primary">🏏 Admin Dashboard</h2>
      <div className="row g-3">

        {/* Clubs Card */}
        <div className="col-md-4">
          <div
            className="card bg-primary text-white text-center p-4 shadow"
            style={cardStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => navigate("/clubs")}
          >
            <h3>{counts.clubs}</h3>
            <p>Clubs</p>
            <small>Click to View</small>
          </div>
        </div>

        {/* Players Card */}
        <div className="col-md-4">
          <div
            className="card bg-warning text-white text-center p-4 shadow"
            style={cardStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => navigate("/players")}
          >
            <h3>{counts.players}</h3>
            <p>Players</p>
            <small>Click to View</small>
          </div>
        </div>

        {/* Matches Card */}
        <div className="col-md-4">
          <div
            className="card bg-success text-white text-center p-4 shadow"
            style={cardStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => navigate("/matches")}
          >
            <h3>{counts.matches}</h3>
            <p>Matches</p>
            <small>Click to View</small>
          </div>
        </div>

        {/* Tournaments Card */}
        <div className="col-md-6">
          <div
            className="card bg-danger text-white text-center p-4 shadow"
            style={cardStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => navigate("/tournaments")}
          >
            <h3>{counts.tournaments}</h3>
            <p>Tournaments</p>
            <small>Click to View</small>
          </div>
        </div>

        {/* Tickets Card */}
        <div className="col-md-6">
          <div
            className="card bg-secondary text-white text-center p-4 shadow"
            style={cardStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => navigate("/tickets")}
          >
            <h3>{counts.tickets}</h3>
            <p>Tickets</p>
            <small>Click to View</small>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
