import React, { useEffect, useState } from "react";
import axios from "axios";

function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [matches, setMatches] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [form, setForm] = useState({ buyerName: "", seats: "", price: "", match: "" });

  const fetchData = () => {
    axios.get("http://localhost:5000/api/tickets")
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/matches")
      .then(res => setMatches(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      axios.delete(`http://localhost:5000/api/tickets/${id}`)
        .then(() => {
          alert("Ticket deleted successfully");
          fetchData();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket._id);
    setForm({
      buyerName: ticket.buyerName,
      seats: ticket.seats,
      price: ticket.price,
      match: ticket.match?._id || ""
    });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/tickets/${id}`, form)
      .then(() => {
        alert("Ticket updated successfully");
        setEditingTicket(null);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="mb-3">All Tickets</h2>
      {tickets.length === 0 ? (
        <div className="alert alert-warning">No tickets found</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Buyer</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Match</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>
                  {editingTicket === ticket._id ? (
                    <input
                      type="text"
                      name="buyerName"
                      value={form.buyerName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    ticket.buyerName
                  )}
                </td>
                <td>
                  {editingTicket === ticket._id ? (
                    <input
                      type="number"
                      name="seats"
                      value={form.seats}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    ticket.seats
                  )}
                </td>
                <td>
                  {editingTicket === ticket._id ? (
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    ticket.price
                  )}
                </td>
                <td>
                  {editingTicket === ticket._id ? (
                    <select
                      name="match"
                      value={form.match}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Match</option>
                      {matches.map(m => (
                        <option key={m._id} value={m._id}>
                          {m.venue} ({new Date(m.date).toLocaleDateString()})
                        </option>
                      ))}
                    </select>
                  ) : (
                    ticket.match?.venue || "N/A"
                  )}
                </td>
                <td>
                  {editingTicket === ticket._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(ticket._id)}
                        className="btn btn-success btn-sm me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTicket(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TicketsList;
