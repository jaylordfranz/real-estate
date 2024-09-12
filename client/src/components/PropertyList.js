import React from 'react';
import axios from 'axios';
import PropertyItem from './PropertyItem';

const PropertyList = ({ properties, setProperty, refreshProperties }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      refreshProperties();
    } catch (error) {
      console.error('Error deleting property', error);
    }
  };

  return (
    <div>
      {properties.map((property) => (
        <PropertyItem
          key={property._id}
          property={property}
          setProperty={setProperty}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PropertyList;
