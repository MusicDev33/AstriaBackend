import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask extends Document {
  name: string;
  done: boolean;
  studentID: string;
  courseID: string;
  dueDate: Date;
  taskLink: string;
}

const TaskSchema: Schema = new Schema({
  name: {type: String, required: true, unique: true},
  done: {type: Boolean, required: true},
  studentID: {type: String, required: true},
  courseID: {type: String, required: true},
  dueDate: {type: Date, required: true},
  taskLink: {type: String, required: false}
}, {
  minimize: false
});

export const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);
