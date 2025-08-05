import React, { useState } from "react";
import axios from "axios";

function AddTournament() {
  const [form, setForm] = useState({ name: "", startDate: "", endDate: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/tournaments", form)
      .then(() => {
        alert("✅ Tournament added successfully!");
        setForm({ name: "", startDate: "", endDate: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-3">Add New Tournament</h2>
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Tournament Name</label>
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
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Tournament</button>
      </form>
    </div>
  );
}

export default AddTournament;
