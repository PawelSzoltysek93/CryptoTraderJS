import inquirer from "inquirer";
import chalk from "chalk";
import { startApp } from "../app.js";

export const goBackToMenu = async () => {
  const { goBack } = await inquirer.prompt([
    {
      type: "confirm",
      name: "goBack",
      message: "⬅️  Go back to main menu",
      default: true,
    },
  ]);

  if (goBack) {
    startApp();
  } else {
    console.log(chalk.yellow("Exiting..."));
    process.exit(0);
  }
};
