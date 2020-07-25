import { Document } from 'mongoose';

export interface ISchool extends Document {
  name: string;
  location: string;
  asID: string;
  img?: string;
}
