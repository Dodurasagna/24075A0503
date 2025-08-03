const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ideas-central';

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty'], default: 'student' },
}, { timestamps: true });

// Idea Schema
const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  teamMembers: [{ type: String }],
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['submitted', 'in_progress', 'reviewed', 'approved', 'rejected'],
    default: 'submitted' 
  },
  facultyComments: { type: String, default: '' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Idea = mongoose.models.Idea || mongoose.model('Idea', IdeaSchema);

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to MongoDB. Seeding data...');
    
    // Clear existing data
    await User.deleteMany({});
    await Idea.deleteMany({});
    
    // Create demo users
    const studentPassword = await bcrypt.hash('password', 12);
    const facultyPassword = await bcrypt.hash('password', 12);
    
    const demoUsers = [
      {
        name: 'John Student',
        email: 'student@test.com',
        password: studentPassword,
        role: 'student'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@test.com',
        password: studentPassword,
        role: 'student'
      },
      {
        name: 'Dr. Faculty',
        email: 'faculty@test.com',
        password: facultyPassword,
        role: 'faculty'
      },
      {
        name: 'Prof. Wilson',
        email: 'prof.wilson@test.com',
        password: facultyPassword,
        role: 'faculty'
      }
    ];
    
    const users = await User.insertMany(demoUsers);
    console.log(`Created ${users.length} demo users`);
    
    // Get student users for creating ideas
    const students = users.filter(user => user.role === 'student');
    
    // Create demo ideas
    const demoIdeas = [
      {
        title: 'AI-Powered Study Assistant',
        description: 'An intelligent tutoring system that uses machine learning to personalize study plans and provide real-time feedback to students. The system would analyze learning patterns and adapt content delivery accordingly.',
        category: 'Technology',
        teamMembers: ['John Student', 'Alice Johnson'],
        studentId: students[0]._id,
        studentName: students[0].name,
        studentEmail: students[0].email,
        status: 'approved',
        facultyComments: 'Excellent concept! The AI integration shows great potential. Consider exploring natural language processing for better interaction.'
      },
      {
        title: 'Sustainable Campus Energy System',
        description: 'A comprehensive renewable energy solution for the campus including solar panels, wind turbines, and smart grid technology to reduce carbon footprint and energy costs.',
        category: 'Environment',
        teamMembers: ['Jane Smith', 'Bob Wilson', 'Carol Davis'],
        studentId: students[1]._id,
        studentName: students[1].name,
        studentEmail: students[1].email,
        status: 'in_progress',
        facultyComments: 'Great environmental initiative. Please include a detailed cost-benefit analysis and implementation timeline.'
      },
      {
        title: 'Mental Health Support App',
        description: 'A mobile application providing 24/7 mental health resources, peer support groups, and AI-driven mood tracking for college students struggling with stress and anxiety.',
        category: 'Healthcare',
        teamMembers: ['John Student'],
        studentId: students[0]._id,
        studentName: students[0].name,
        studentEmail: students[0].email,
        status: 'reviewed',
        facultyComments: 'Important topic with significant impact potential. Consider privacy concerns and integration with campus counseling services.'
      },
      {
        title: 'Virtual Reality Chemistry Lab',
        description: 'An immersive VR environment for chemistry experiments that allows students to conduct dangerous or expensive experiments safely in a virtual setting.',
        category: 'Education',
        teamMembers: ['Jane Smith', 'David Chen'],
        studentId: students[1]._id,
        studentName: students[1].name,
        studentEmail: students[1].email,
        status: 'submitted'
      },
      {
        title: 'Food Waste Reduction Platform',
        description: 'A digital platform connecting campus dining services with students to redistribute excess food and reduce waste through a real-time notification system.',
        category: 'Social Impact',
        teamMembers: ['John Student', 'Emma Rodriguez', 'Mike Thompson'],
        studentId: students[0]._id,
        studentName: students[0].name,
        studentEmail: students[0].email,
        status: 'submitted'
      }
    ];
    
    const ideas = await Idea.insertMany(demoIdeas);
    console.log(`Created ${ideas.length} demo ideas`);
    
    console.log('Database seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('Student: student@test.com / password');
    console.log('Student: jane.smith@test.com / password');
    console.log('Faculty: faculty@test.com / password');
    console.log('Faculty: prof.wilson@test.com / password');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();