import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPlayer() {
  const [form, setForm] = useState({ name: "", role: "", age: "", club: "" });
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clubs")
      .then(res => setClubs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/players", form)
      .then(() => {
        alert("✅ Player added successfully!");
        setForm({ name: "", role: "", age: "", club: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-3">Add New Player</h2>
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Role</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Wicket-keeper">Wicket-keeper</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Club</label>
          <select
            name="club"
            value={form.club}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Club</option>
            {clubs.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Player</button>
      </form>
    </div>
  );
}

export default AddPlayer;
