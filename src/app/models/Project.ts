import { User } from './User';

export class Project {
  _id: string;
  owner: string;  // change to user later
  name: string;
  editors: User[];
  maxUsers: number;
  language: string;
}
