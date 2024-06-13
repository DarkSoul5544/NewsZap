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

  const createHigherAdmin = async () => {
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
    <div>
      <h2>Admin Panel</h2>


      {role === 'higher-admin' && (
        <div>
          <h3>Create Higher Admin</h3>
          <form onSubmit={createHigherAdmin}>
            <label>
              Email:
              <input type="email" value={newAdminEmail} onChange={handleNewAdminEmailChange} required />
            </label>
            <button type="submit">Create Higher Admin</button>
          </form>
          <hr />

          <h3>All Users</h3>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                {user.email} - {user.role}
                {!user.is_premium && <button onClick={() => upgradeToPremium(user._id)}>Upgrade to Premium</button>}
                {user.role !== 'administrator' && <button onClick={() => makeAdmin(user._id)}>Make Admin</button>}
                <button onClick={() => deleteUser(user._id)}>Delete User</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {role === 'administrator' && (
        <div>
          <h3>Premium Users</h3>
          <ul>
            {users.filter(user => user.is_premium).map(user => (
              <li key={user._id}>{user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

