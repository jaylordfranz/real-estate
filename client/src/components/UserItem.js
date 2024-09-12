import React from 'react';

const UserItem = ({ user, setUser, handleDelete }) => {
  return (
    <div>
      <h3>{user.username}</h3>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <button onClick={() => setUser(user)}>Edit</button>
      <button onClick={() => handleDelete(user._id)}>Delete</button>
    </div>
  );
};

export default UserItem;
