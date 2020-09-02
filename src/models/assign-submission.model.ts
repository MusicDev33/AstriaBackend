import { Document } from 'mongoose';

export interface IAssignSubmission extends Document {
  objects: any;
  assignmentID: string;
  nonStrict?: boolean;
  userID: string;
  timeSubmitted: Date;
  autosaved: boolean;
}
