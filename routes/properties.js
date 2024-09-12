const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Create Property
router.post('/properties', async (req, res) => {
  const { title, description, price, location, type, status, images, agentId } = req.body;
  try {
    const property = new Property({ title, description, price, location, type, status, images, agentId });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read Properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().populate('agentId');
    res.json(properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Property
router.put('/properties/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, type, status, images, agentId } = req.body;
  try {
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    property.title = title;
    property.description = description;
    property.price = price;
    property.location = location;
    property.type = type;
    property.status = status;
    property.images = images;
    property.agentId = agentId;

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Property
router.delete('/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
