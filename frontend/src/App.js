import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MatchesList from "./components/MatchesList";
import AddMatch from "./components/AddMatch";
import ClubsList from "./components/ClubsList";
import AddClub from "./components/AddClub";
import PlayersList from "./components/PlayersList";
import AddPlayer from "./components/AddPlayer";
import TournamentsList from "./components/TournamentsList";
import AddTournament from "./components/AddTournament";
import TicketsList from "./components/TicketsList";
import AddTicket from "./components/AddTicket";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container my-4">
        <header className="mb-4">
          <h1 className="text-center text-primary fw-bold mb-3">
            🏏 Cricket Match Booking - Admin Dashboard
          </h1>
          <nav className="d-flex flex-wrap justify-content-center gap-3">
            <NavLink to="/" end className={({ isActive }) => isActive ? "btn btn-dark text-white" : "btn btn-outline-dark"}>Dashboard</NavLink>
            <NavLink to="/matches" className={({ isActive }) => isActive ? "btn btn-primary text-white" : "btn btn-outline-primary"}>View Matches</NavLink>
            <NavLink to="/add-match" className={({ isActive }) => isActive ? "btn btn-success text-white" : "btn btn-outline-success"}>Add Match</NavLink>
            <NavLink to="/clubs" className={({ isActive }) => isActive ? "btn btn-info text-white" : "btn btn-outline-info"}>View Clubs</NavLink>
            <NavLink to="/add-club" className={({ isActive }) => isActive ? "btn btn-secondary text-white" : "btn btn-outline-secondary"}>Add Club</NavLink>
            <NavLink to="/players" className={({ isActive }) => isActive ? "btn btn-warning text-white" : "btn btn-outline-warning"}>View Players</NavLink>
            <NavLink to="/add-player" className={({ isActive }) => isActive ? "btn btn-dark text-white" : "btn btn-outline-dark"}>Add Player</NavLink>
            <NavLink to="/tournaments" className={({ isActive }) => isActive ? "btn btn-danger text-white" : "btn btn-outline-danger"}>View Tournaments</NavLink>
            <NavLink to="/add-tournament" className={({ isActive }) => isActive ? "btn btn-danger text-white" : "btn btn-outline-danger"}>Add Tournament</NavLink>
            <NavLink to="/tickets" className={({ isActive }) => isActive ? "btn btn-primary text-white" : "btn btn-outline-primary"}>View Tickets</NavLink>
            <NavLink to="/add-ticket" className={({ isActive }) => isActive ? "btn btn-success text-white" : "btn btn-outline-success"}>Book Ticket</NavLink>
          </nav>
        </header>
        <main className="card shadow-sm p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/matches" element={<MatchesList />} />
            <Route path="/add-match" element={<AddMatch />} />
            <Route path="/clubs" element={<ClubsList />} />
            <Route path="/add-club" element={<AddClub />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/add-player" element={<AddPlayer />} />
            <Route path="/tournaments" element={<TournamentsList />} />
            <Route path="/add-tournament" element={<AddTournament />} />
            <Route path="/tickets" element={<TicketsList />} />
            <Route path="/add-ticket" element={<AddTicket />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
