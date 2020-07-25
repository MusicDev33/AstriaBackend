import { Document } from 'mongoose';

export interface ILayout extends Document {
  nonStrict?: boolean;
}
