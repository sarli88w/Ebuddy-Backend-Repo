import { Collection } from "fireorm";

@Collection("USERS")
export class User {
  id!: string;
  username!: string;
  name!: string;
  email!: string;
  password!: string;
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: number;
}

export const UserPublicFields: string[] = [
  'id',
  'username',
  'name',
  'email',
  'password',
  'totalAverageWeightRatings',
  'numberOfRents',
  'recentlyActive',
];
