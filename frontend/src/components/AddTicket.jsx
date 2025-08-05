import React, { useEffect, useState } from "react";
import axios from "axios";

function AddTicket() {
  const [form, setForm] = useState({ buyerName: "", seats: "", price: "", match: "" });
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/matches")
      .then(res => setMatches(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/tickets", form)
      .then(() => {
        alert("✅ Ticket booked successfully!");
        setForm({ buyerName: "", seats: "", price: "", match: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-3">Book New Ticket</h2>
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Buyer Name</label>
          <input
            type="text"
            name="buyerName"
            value={form.buyerName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seats</label>
          <input
            type="number"
            name="seats"
            value={form.seats}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Match</label>
          <select
            name="match"
            value={form.match}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Match</option>
            {matches.map(m => (
              <option key={m._id} value={m._id}>
                {m.venue} ({new Date(m.date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Book Ticket</button>
      </form>
    </div>
  );
}

export default AddTicket;
