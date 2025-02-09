import { hashPassword } from "../utils";

const users = [
  { name: "Super Admin", email: "superadmin@email.com", password: hashPassword("pass1234") },
  { name: "Admin", email: "admin@email.com", password: hashPassword("pass1234") },
];

export const seedUsers = (firebaseAdmin: any) => {
  for (const user of users) {
    try {
      firebaseAdmin.auth().createUser(user);
      console.log(`Add ${user.name} success`);
    } catch (err: any) {
      console.error(`Add ${user.name} failed`, err.message);
    }
  }
  
  process.exit();
}
