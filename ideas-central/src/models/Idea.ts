import mongoose, { Document, Schema } from 'mongoose';

export interface IIdea extends Document {
  title: string;
  description: string;
  category: string;
  teamMembers: string[];
  studentId: mongoose.Types.ObjectId;
  studentName: string;
  studentEmail: string;
  status: 'submitted' | 'in_progress' | 'reviewed' | 'approved' | 'rejected';
  facultyComments?: string;
  mentorId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const IdeaSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Technology', 'Business', 'Social Impact', 'Healthcare', 'Education', 'Environment', 'Other'],
  },
  teamMembers: [{
    type: String,
    trim: true,
  }],
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['submitted', 'in_progress', 'reviewed', 'approved', 'rejected'],
    default: 'submitted',
  },
  facultyComments: {
    type: String,
    default: '',
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Idea || mongoose.model<IIdea>('Idea', IdeaSchema);