import React, { useEffect, useState } from "react";
import axios from "axios";

function ClubsList() {
  const [clubs, setClubs] = useState([]);
  const [editingClub, setEditingClub] = useState(null);
  const [form, setForm] = useState({ name: "", location: "", founded: "" });

  const fetchClubs = () => {
    axios.get("http://localhost:5000/api/clubs")
      .then(res => setClubs(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this club?")) {
      axios.delete(`http://localhost:5000/api/clubs/${id}`)
        .then(() => {
          alert("Club deleted successfully");
          fetchClubs();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (club) => {
    setEditingClub(club._id);
    setForm({
      name: club.name,
      location: club.location,
      founded: club.founded
    });
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/clubs/${id}`, form)
      .then(() => {
        alert("Club updated successfully");
        setEditingClub(null);
        fetchClubs();
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="mb-3">All Clubs</h2>
      {clubs.length === 0 ? (
        <div className="alert alert-warning">No clubs found</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Founded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club._id}>
                <td>
                  {editingClub === club._id ? (
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    club.name
                  )}
                </td>
                <td>
                  {editingClub === club._id ? (
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    club.location
                  )}
                </td>
                <td>
                  {editingClub === club._id ? (
                    <input
                      type="number"
                      name="founded"
                      value={form.founded}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    club.founded
                  )}
                </td>
                <td>
                  {editingClub === club._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(club._id)}
                        className="btn btn-success btn-sm me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingClub(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(club)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(club._id)}
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

export default ClubsList;
