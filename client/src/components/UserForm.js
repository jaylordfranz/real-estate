import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user, setUser, refreshUsers }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
    profileInfo: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.put(`http://localhost:5000/api/users/${user._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/users', formData);
      }
      setUser(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'customer',
        profileInfo: ''
      });
      refreshUsers();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="admin">Admin</option>
        <option value="agent">Agent</option>
        <option value="customer">Customer</option>
      </select>
      <textarea
        name="profileInfo"
        value={formData.profileInfo}
        onChange={handleChange}
        placeholder="Profile Info"
      />
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;
