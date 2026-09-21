import { useEffect, useState } from "react";
import api from "../services/api";

function Members() {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load members");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/members/${editingId}`, form);
        alert("Member updated successfully");
      } else {
        await api.post("/members", form);
        alert("Member added successfully");
      }

      resetForm();
      loadMembers();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const editMember = (member) => {
    setEditingId(member.id);

    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
    });
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/members/${id}`);
      loadMembers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete member");
    }
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Members</h1>
          <p>Manage library members</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="form-card">
          <h2>{editingId ? "Edit Member" : "Add Member"}</h2>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter member name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              required
            />

            <button className="btn primary" type="submit">
              {editingId ? "Update Member" : "Add Member"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h2>Member List</h2>
            <span>{members.length} members</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty">
                      No members found
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phone}</td>
                      <td>
                        <button
                          className="action edit"
                          onClick={() => editMember(member)}
                        >
                          Edit
                        </button>

                        <button
                          className="action delete"
                          onClick={() => deleteMember(member.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;
