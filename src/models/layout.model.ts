import { Document } from 'mongoose';

export interface ILayout extends Document {
  objects: any;
  assignmentID: string;
  nonStrict?: boolean;
}
