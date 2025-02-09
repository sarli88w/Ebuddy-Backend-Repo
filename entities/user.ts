import { Collection } from "fireorm";

@Collection("users")
export class User {
  id!: string;
  username!: string;
  name!: string;
  email!: string;
  password!: string;
}
