import React, { useEffect, useState } from "react";
import axios from "axios";

function AddMatch() {
  const [form, setForm] = useState({ date: "", venue: "", club1: "", club2: "", tournament: "" });
  const [clubs, setClubs] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clubs").then(res => setClubs(res.data));
    axios.get("http://localhost:5000/api/tournaments").then(res => setTournaments(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/matches", form)
      .then(() => {
        alert("✅ Match added successfully!");
        setForm({ date: "", venue: "", club1: "", club2: "", tournament: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-3">Add New Match</h2>
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input type="text" className="form-control" name="venue" value={form.venue} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Club 1</label>
          <select className="form-select" name="club1" value={form.club1} onChange={handleChange} required>
            <option value="">Select Club 1</option>
            {clubs.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Club 2</label>
          <select className="form-select" name="club2" value={form.club2} onChange={handleChange} required>
            <option value="">Select Club 2</option>
            {clubs.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tournament</label>
          <select className="form-select" name="tournament" value={form.tournament} onChange={handleChange}>
            <option value="">Select Tournament</option>
            {tournaments.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Match</button>
      </form>
    </div>
  );
}

export default AddMatch;
