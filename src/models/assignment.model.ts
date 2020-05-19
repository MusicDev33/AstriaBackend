import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssignment extends Document {
  name: string;
  openDate: Date;
  dueDate: Date;
  closeDate: Date;
  description: string;
  type: string; // What kind of assignment? A Quiz? Upload?
  allowedFileExtensions: string[];
  points: number;
}

const AssignmentSchema: Schema = new Schema({
  name: {type: String, required: true},
  openDate: {type: Date, required: true},
  dueDate: {type: Date, required: true},
  closeDate: {type: Date, required: true},
  description: {type: String, required: false},
  type: {type: String, required: true},
  allowedFileExtensions: [{type: String, required: false}],
  points: {type: Number, required: false}
}, {
  minimize: false
});

export const Assignment: Model<IAssignment> = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
