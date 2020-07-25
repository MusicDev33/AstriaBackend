import mongoose, { Schema, Model } from 'mongoose';
import { ICompletion } from '@models/completion.model';

const CompletionSchema: Schema = new Schema({
	score: {type: Number, required: false},
	maxScore: {type: Number, required: false},
	completed: {type: Boolean, required: false},
},{
	minimize: false, 
	strict: false
});

export const Completion: Model<ICompletion> = mongoose.model<ICompletion>('Completion', CompletionSchema);
