import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import PropertyForm from './components/PropertyForm';
import PropertyList from './components/PropertyList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [managementType, setManagementType] = useState('users'); // 'users' or 'properties'

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  };

  useEffect(() => {
    if (managementType === 'users') {
      fetchUsers();
    } else {
      fetchProperties();
    }
  }, [managementType]);

  return (
    <div>
      <h1>{managementType === 'users' ? 'User Management' : 'Property Management'}</h1>
      <button onClick={() => setManagementType('users')}>Manage Users</button>
      <button onClick={() => setManagementType('properties')}>Manage Properties</button>
      
      {managementType === 'users' ? (
        <>
          <UserForm user={selectedUser} setUser={setSelectedUser} refreshUsers={fetchUsers} />
          <UserList users={users} setUser={setSelectedUser} refreshUsers={fetchUsers} />
        </>
      ) : (
        <>
          <PropertyForm property={selectedProperty} setProperty={setSelectedProperty} refreshProperties={fetchProperties} />
          <PropertyList properties={properties} setProperty={setSelectedProperty} refreshProperties={fetchProperties} />
        </>
      )}
    </div>
  );
};

export default App;
