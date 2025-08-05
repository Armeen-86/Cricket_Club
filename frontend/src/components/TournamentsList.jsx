import React, { useEffect, useState } from "react";
import axios from "axios";

function TournamentsList() {
  const [tournaments, setTournaments] = useState([]);
  const [editingTournament, setEditingTournament] = useState(null);
  const [form, setForm] = useState({ name: "", startDate: "", endDate: "" });

  const fetchTournaments = () => {
    axios.get("http://localhost:5000/api/tournaments")
      .then(res => setTournaments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      axios.delete(`http://localhost:5000/api/tournaments/${id}`)
        .then(() => {
          alert("Tournament deleted successfully");
          fetchTournaments();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (tournament) => {
    setEditingTournament(tournament._id);
    setForm({
      name: tournament.name,
      startDate: tournament.startDate.split("T")[0],
      endDate: tournament.endDate.split("T")[0]
    });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/tournaments/${id}`, form)
      .then(() => {
        alert("Tournament updated successfully");
        setEditingTournament(null);
        fetchTournaments();
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="mb-3">All Tournaments</h2>
      {tournaments.length === 0 ? (
        <div className="alert alert-warning">No tournaments found</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament._id}>
                <td>
                  {editingTournament === tournament._id ? (
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    tournament.name
                  )}
                </td>
                <td>
                  {editingTournament === tournament._id ? (
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    new Date(tournament.startDate).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editingTournament === tournament._id ? (
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    new Date(tournament.endDate).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editingTournament === tournament._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(tournament._id)}
                        className="btn btn-success btn-sm me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTournament(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(tournament)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tournament._id)}
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

export default TournamentsList;
