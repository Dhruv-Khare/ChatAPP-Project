import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";

const createUser = async (numUser) => {
  try {
    const userPromise = [];
    for (let i = 0; i < numUser; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        userName: faker.internet.userName(),
        password: "password",
        bio: faker.lorem.paragraph(10),
        avatar: {
          public_id: faker.image.avatar(),
          url: faker.system.fileName(),
        },
      });
      userPromise.push(tempUser);
    }
    await Promise.all(userPromise);
    console.log("Users Created Successfully");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export { createUser };
