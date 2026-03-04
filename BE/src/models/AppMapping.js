const mongoose = require('mongoose');

const appMappingSchema = new mongoose.Schema(
  {
    appId:      { type: Number, required: true, unique: true, index: true },
    templateId: { type: Number, required: true, index: true },
    isActive:   { type: Boolean, default: true },
  },
  { collection: 'app_mapping' }
);

module.exports = mongoose.model('AppMapping', appMappingSchema);
