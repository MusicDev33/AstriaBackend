import mongoose, { Schema, Model } from 'mongoose';
import { ITask } from '@models/task.model';

const TaskSchema: Schema = new Schema({
	name: {type: String, required: true},
	done: {type: Boolean, required: true},
	studentID: {type: String, required: true},
	courseID: {type: String, required: true},
	dueDate: {type: Date, required: true},
	taskLink: {type: String, required: false}
},{
	minimize: false
});

export const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);
