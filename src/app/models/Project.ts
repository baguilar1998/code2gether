import { User } from './User';
/**
 * Front-end modal for a Project
 */
export class Project {
  _id: string;
  owner: string;  // change to user later
  name: string;
  editors: User[];
  maxUsers: number;
  urlKey: string;
  language: string;
}
