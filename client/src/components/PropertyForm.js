import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyForm = ({ property, setProperty, refreshProperties }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'house',
    status: 'available',
    images: '',
    agentId: ''
  });

  useEffect(() => {
    if (property) {
      setFormData(property);
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (property) {
        await axios.put(`http://localhost:5000/api/properties/${property._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/properties', formData);
      }
      setProperty(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        type: 'house',
        status: 'available',
        images: '',
        agentId: ''
      });
      refreshProperties();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
      </select>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="available">Available</option>
        <option value="sold">Sold</option>
      </select>
      <input
        type="text"
        name="images"
        value={formData.images}
        onChange={handleChange}
        placeholder="Images (comma-separated URLs)"
      />
      <input
        type="text"
        name="agentId"
        value={formData.agentId}
        onChange={handleChange}
        placeholder="Agent ID"
        required
      />
      <button type="submit">{property ? 'Update' : 'Create'} Property</button>
    </form>
  );
};

export default PropertyForm;
