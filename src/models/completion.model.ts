import { Document } from 'mongoose';

export interface ICompletion extends Document {
  score?: number;
  maxScore?: number;
  completed?: boolean;
  nonStrict?: boolean;
}
