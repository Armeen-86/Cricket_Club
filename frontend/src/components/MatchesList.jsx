import React, { useEffect, useState } from "react";
import axios from "axios";

function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [editingMatch, setEditingMatch] = useState(null);
  const [form, setForm] = useState({ date: "", venue: "", club1: "", club2: "", tournament: "" });

  // ✅ Fetch data
  const fetchData = () => {
    axios.get("http://localhost:5000/api/matches")
      .then(res => setMatches(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/clubs")
      .then(res => setClubs(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/tournaments")
      .then(res => setTournaments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Delete match
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      axios.delete(`http://localhost:5000/api/matches/${id}`)
        .then(() => {
          alert("Match deleted successfully");
          fetchData();
        })
        .catch(err => console.error(err));
    }
  };

  // ✅ Enable edit mode
  const handleEdit = (match) => {
    setEditingMatch(match._id);
    setForm({
      date: match.date.split("T")[0],
      venue: match.venue,
      club1: match.club1?._id || "",
      club2: match.club2?._id || "",
      tournament: match.tournament?._id || ""
    });
  };

  // ✅ Update match
  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/matches/${id}`, form)
      .then(() => {
        alert("Match updated successfully");
        setEditingMatch(null);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="mb-3">All Matches</h2>
      {matches.length === 0 ? (
        <div className="alert alert-warning">No matches found</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Venue</th>
              <th>Club 1</th>
              <th>Club 2</th>
              <th>Tournament</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match._id}>
                {/* Date */}
                <td>
                  {editingMatch === match._id ? (
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    new Date(match.date).toLocaleDateString()
                  )}
                </td>

                {/* Venue */}
                <td>
                  {editingMatch === match._id ? (
                    <input
                      type="text"
                      name="venue"
                      value={form.venue}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    match.venue
                  )}
                </td>

                {/* Club 1 */}
                <td>
                  {editingMatch === match._id ? (
                    <select
                      name="club1"
                      value={form.club1}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Club 1</option>
                      {clubs.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  ) : (
                    match.club1?.name || "N/A"
                  )}
                </td>

                {/* Club 2 */}
                <td>
                  {editingMatch === match._id ? (
                    <select
                      name="club2"
                      value={form.club2}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Club 2</option>
                      {clubs.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  ) : (
                    match.club2?.name || "N/A"
                  )}
                </td>

                {/* Tournament */}
                <td>
                  {editingMatch === match._id ? (
                    <select
                      name="tournament"
                      value={form.tournament}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Tournament</option>
                      {tournaments.map(t => (
                        <option key={t._id} value={t._id}>{t.name}</option>
                      ))}
                    </select>
                  ) : (
                    match.tournament?.name || "N/A"
                  )}
                </td>

                {/* Actions */}
                <td>
                  {editingMatch === match._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(match._id)}
                        className="btn btn-success btn-sm me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingMatch(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(match)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(match._id)}
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

export default MatchesList;
