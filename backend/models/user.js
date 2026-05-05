const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:   { type: String, required: true },
    studentId:  { type: String, unique: true, sparse: true },   // e.g. 23L-0945
    dept:       { type: String, default: '' },                  // Computer Science
    batch:      { type: String, default: '' },                  // 2023
    skills:     [{ type: String }],                             // ['React', 'Node.js']
    interests:  [{ type: String }],
    bio:        { type: String, default: '' },
    available:  { type: Boolean, default: true },
    profileStrength: { type: Number, default: 40 },             // 0-100
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);