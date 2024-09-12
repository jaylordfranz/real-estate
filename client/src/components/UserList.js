import React from 'react';
import axios from 'axios';
import UserItem from './UserItem';

const UserList = ({ users, setUser, refreshUsers }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      refreshUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div>
      {users.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          setUser={setUser}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default UserList;
