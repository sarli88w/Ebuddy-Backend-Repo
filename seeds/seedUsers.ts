import { getRepository } from "fireorm";
import { hashPassword } from "../utils";
import { User } from "../entities";

const users = [
  { username: "superadmin", name: "Super Admin", email: "superadmin@xmail.com", password: hashPassword("pass1234") },
  { username: "admin", name: "Admin", email: "admin@xmail.com", password: hashPassword("pass1234") },
];

export const seedUsers = async (firebaseAdmin: any) => {
  const repository = getRepository(User);

  for (const user of users) {
    try {
      const record = await firebaseAdmin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      });

      await repository.create({
        id: record.uid,
        username: user.username,
        name: record.displayName,
        email: record.email,
        password: user.password,
      });

      console.log(`Add ${user.username} success`);
    } catch (err: any) {
      console.error(`Add ${user.username} failed`, err.message);
    }
  }
  
  process.exit();
}
