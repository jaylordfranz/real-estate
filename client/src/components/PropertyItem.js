import React from 'react';

const PropertyItem = ({ property, setProperty, handleDelete }) => {
  return (
    <div>
      <h3>{property.title}</h3>
      <p>{property.description}</p>
      <p>{property.price}</p>
      <p>{property.location}</p>
      <p>{property.type}</p>
      <p>{property.status}</p>
      <img src={property.images[0]} alt={property.title} width="100" />
      <button onClick={() => setProperty(property)}>Edit</button>
      <button onClick={() => handleDelete(property._id)}>Delete</button>
    </div>
  );
};

export default PropertyItem;
