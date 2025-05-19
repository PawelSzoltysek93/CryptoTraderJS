import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { startApp } from "../app.js";

export const userCheck = async () => {
  const filePath = "users.json";

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("No registered users found. Please register first."));
    return;
  }

  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);

  const { username, password } = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your username:",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "*",
    },
  ]);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    console.log(chalk.green(`\nWelcome, ${username}!`));
    await startApp();
  } else {
    console.log(chalk.red("\nInvalid username or password. Try again.\n"));
    await userCheck();
  }
};
