/**
 * Seed Script — run once to populate DB with sample students
 * Usage:  node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/User');

const students = [
  {
    name: 'Fatima Malik', email: 'fatima@fynder.com', studentId: '23L-0945',
    dept: 'Computer Science', batch: '2023',
    skills: ['Python', 'Machine Learning', 'Data Science', 'Deep Learning'],
    interests: ['AI', 'Data Analytics'], available: true, profileStrength: 90,
  },
  {
    name: 'Hassan Ali', email: 'hassan@fynder.com', studentId: '23L-0956',
    dept: 'Software Engineering', batch: '2023',
    skills: ['React', 'Node.js', 'MongoDB', 'Machine Learning'],
    interests: ['Web Development', 'Full Stack'], available: true, profileStrength: 85,
  },
  {
    name: 'Zainab Khan', email: 'zainab@fynder.com', studentId: '23L-0967',
    dept: 'Computer Science', batch: '2023',
    skills: ['Flutter', 'Dart', 'Firebase'],
    interests: ['Mobile Development'], available: true, profileStrength: 70,
  },
  {
    name: 'Ali Hassan', email: 'ali@fynder.com', studentId: '23L-0920',
    dept: 'Computer Science', batch: '2023',
    skills: ['Python', 'AI', 'Cybersecurity'],
    interests: ['Artificial Intelligence'], available: true, profileStrength: 75,
  },
  {
    name: 'Ahmed Khan', email: 'ahmed@fynder.com', studentId: '23L-0895',
    dept: 'Computer Science', batch: '2023',
    skills: ['Web Development', 'React', 'TypeScript'],
    interests: ['Frontend', 'UI/UX'], available: true, profileStrength: 80,
  },
  {
    name: 'Sara Ahmed', email: 'sara@fynder.com', studentId: '23L-0912',
    dept: 'Computer Science', batch: '2023',
    skills: ['UI/UX Design', 'Frontend Development', 'Figma'],
    interests: ['Design Systems', 'User Research'], available: true, profileStrength: 88,
  },
  // Demo login account
  {
    name: 'Umaima Siddiqui', email: 'umaima@fynder.com', studentId: '23L-0001',
    dept: 'Computer Science', batch: '2023',
    skills: ['React', 'Python', 'Machine Learning'],
    interests: ['AI', 'Web Development'], available: true, profileStrength: 85,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  Connected to MongoDB');

    const hashed = await bcrypt.hash('password123', 12);

    for (const s of students) {
      await User.findOneAndUpdate(
        { email: s.email },
        { ...s, password: hashed },
        { upsert: true, new: true }
      );
      console.log(`  ✔  ${s.name} (${s.email})`);
    }

    console.log('\n🎉  Seed complete!');
    console.log('    Demo login → email: umaima@fynder.com | password: password123');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
  }
})();