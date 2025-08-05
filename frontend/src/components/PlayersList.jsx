import React, { useEffect, useState } from "react";
import axios from "axios";

function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", age: "", club: "" });

  const fetchData = () => {
    axios.get("http://localhost:5000/api/players")
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/clubs")
      .then(res => setClubs(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      axios.delete(`http://localhost:5000/api/players/${id}`)
        .then(() => {
          alert("Player deleted successfully");
          fetchData();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player._id);
    setForm({
      name: player.name,
      role: player.role,
      age: player.age,
      club: player.club?._id || ""
    });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/players/${id}`, form)
      .then(() => {
        alert("Player updated successfully");
        setEditingPlayer(null);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="mb-3">All Players</h2>
      {players.length === 0 ? (
        <div className="alert alert-warning">No players found</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Age</th>
              <th>Club</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id}>
                <td>
                  {editingPlayer === player._id ? (
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    player.name
                  )}
                </td>
                <td>
                  {editingPlayer === player._id ? (
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-rounder">All-rounder</option>
                      <option value="Wicket-keeper">Wicket-keeper</option>
                    </select>
                  ) : (
                    player.role
                  )}
                </td>
                <td>
                  {editingPlayer === player._id ? (
                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    player.age
                  )}
                </td>
                <td>
                  {editingPlayer === player._id ? (
                    <select
                      name="club"
                      value={form.club}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Club</option>
                      {clubs.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  ) : (
                    player.club?.name || "N/A"
                  )}
                </td>
                <td>
                  {editingPlayer === player._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(player._id)}
                        className="btn btn-success btn-sm me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPlayer(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(player)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(player._id)}
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

export default PlayersList;
