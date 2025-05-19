import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { logIn } from "../landingPage.js";

export const register = async () => {
  console.clear();

  const filePath = path.join(process.cwd(), "users.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const { username, password } = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your username:",
      validate: (input) => {
        if (input.length < 3) {
          return "Username must be at least 3 characters long.";
        }
        if (users.some((user) => user.username === input)) {
          return "Username already exists. Please choose another one.";
        }
        return true;
      },
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "*",
      validate: (input) => {
        if (input.length < 6) {
          return "Password must be at least 6 characters long.";
        }
        return true;
      },
    },
  ]);

  users.push({ username, password });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  console.log(chalk.green("User registered successfully!"));
  logIn();
};
