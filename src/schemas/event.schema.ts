import mongoose, { Schema, Model } from 'mongoose';
import { IEvent } from '@models/event.model';

const EventSchema: Schema = new Schema({
	header: {type: String, required: true},
	description: {type: String, required: true},
	courseID: {type: String, required: true},
	author: {type: String, required: true},
	time: {type: Date, required: true}
},{
	minimize: false
});

export const Event: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
