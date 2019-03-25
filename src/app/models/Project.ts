import { User } from './User';

export class Project {
  _id: string;
  owner: string;
  name: string;
  editors: User[];
  maxUsers: number;
  language: string;
}
