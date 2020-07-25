import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICompletion extends Document {
  score?: number;
  maxScore?: number;
  completed?: boolean;
  nonStrict?: boolean;
}

const AssignmentSchema: Schema = new Schema({
  name: {type: String, required: true},
  openDate: {type: Date, required: true},
  dueDate: {type: Date, required: true},
  closeDate: {type: Date, required: true},
  description: {type: String, required: false},
  type: {type: String, required: true},
  allowedFileExtensions: [{type: String, required: false}],
  points: {type: Number, required: false},
  courseID: {type: String, required: true},
  graded: {type: Boolean, required: true},
  layoutID: {type: String, required: false}
}, {
  minimize: false
});

export const Assignment: Model<IAssignment> = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
