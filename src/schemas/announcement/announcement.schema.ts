import mongoose, { Schema, Model } from 'mongoose';
import { IAnnouncement } from '@models/announcement.model';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const AnnouncementSchema: Schema = new Schema({
	header: {type: String, required: true, trim: true},
	description: {type: String, required: true},
	courseID: {type: String, required: true},
	author: {type: String, required: true},
	authorID: {type: String, required: true},
	time: {type: Date, required: true},
	icon: {type: String, required: true},
	iconColor: {type: String, required: true},
	iconBgColor: {type: String, required: true}
},{
	minimize: false
});

export const Announcement: Model<IAnnouncement> = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
export const AnnouncementTC = composeWithMongoose(Announcement);
