import React, { useState } from "react";
import axios from "axios";

function AddClub() {
  const [form, setForm] = useState({ name: "", location: "", founded: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/clubs", form)
      .then(() => {
        alert("✅ Club added successfully!");
        setForm({ name: "", location: "", founded: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-3">Add New Club</h2>
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
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Founded</label>
          <input
            type="number"
            name="founded"
            value={form.founded}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Club</button>
      </form>
    </div>
  );
}

export default AddClub;
