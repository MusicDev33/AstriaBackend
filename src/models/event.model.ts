import mongoose, { Schema, Document, Model } from 'mongoose';

// Not sure why this needs to be separate from announcement
export interface IEvent extends Document {
  header: string;
  description: string;
  courseID: string;
  author: string;
  time: Date;
}

const EventSchema: Schema = new Schema({
  header: {type: String, required: true},
  description: {type: String, required: true},
  courseID: {type: String, required: true},
  author: {type: String, required: true},
  time: {type: Date, required: true}
}, {
  minimize: false
});

export const Event: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
