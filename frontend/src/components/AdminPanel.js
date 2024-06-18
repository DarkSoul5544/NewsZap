import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchUsers(token);
      fetchUserRole(token);
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserRole = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const upgradeToPremium = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/admin/upgrade-premium/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(token); // Refresh the list
    } catch (error) {
      console.error('Error upgrading user to premium:', error);
    }
  };

  const makeAdmin = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/admin/make-admin/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(token); // Refresh the list
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(token); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const createHigherAdmin = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/api/admin/create-higher-admin`, { email: newAdminEmail }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`Successfully created higher admin account for ${newAdminEmail}`);
      fetchUsers(token); // Refresh the user list
    } catch (error) {
      console.error('Error creating higher admin:', error);
    }
  };

  const handleNewAdminEmailChange = (event) => {
    setNewAdminEmail(event.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel</h2>
      {role === 'higher-admin' && (
        <div className="card mb-4">
          <div className="card-body">
            <h3>Create Higher Admin</h3>
            <form onSubmit={createHigherAdmin}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={handleNewAdminEmailChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Higher Admin</button>
            </form>
          </div>
        </div>
      )}

      <h3>All Users</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {!user.is_premium && role === 'higher-admin' && (
                  <button className="btn btn-success btn-sm mr-2" onClick={() => upgradeToPremium(user._id)}>Upgrade to Premium</button>
                )}
                {role === 'higher-admin' && user.role !== 'administrator' && (
                  <button className="btn btn-warning btn-sm mr-2" onClick={() => makeAdmin(user._id)}>Make Admin</button>
                )}
                {role === 'higher-admin' && (
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Delete User</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
