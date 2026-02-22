export type UserRole = 'editor' | 'approver';

export interface User {
  _id: string;
  email: string;
  displayName: string;
  photo: string;
  visitedPlaces: string[];
  role: UserRole;
  createdAt: string;
}
