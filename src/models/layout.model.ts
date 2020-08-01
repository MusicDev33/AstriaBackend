import { Document } from 'mongoose';

export interface ILayout extends Document {
  objects: any;
  nonStrict?: boolean;
}
