const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema(
  {
    id:   { type: String, required: true },
    type: { type: String, required: true },
    html: { type: String, required: true },
  },
  { _id: false }
);

const themeSchema = new mongoose.Schema(
  {
    primaryColor:    { type: String },
    backgroundColor: { type: String },
    textColor:       { type: String },
  },
  { _id: false }
);

const templateSchema = new mongoose.Schema(
  {
    templateId:    { type: Number, required: true, unique: true, index: true },
    name:          { type: String, required: true },
    status:        { type: String, enum: ['active', 'disabled'], default: 'active' },
    schemaVersion: { type: Number, required: true, default: 1 },
    template: {
      theme:  { type: themeSchema, default: () => ({}) },
      blocks: { type: [blockSchema], default: [] },
    },
  },
  {
    collection: 'templates',
    timestamps: true,
  }
);

module.exports = mongoose.model('Template', templateSchema);
