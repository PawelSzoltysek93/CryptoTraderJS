import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import { register } from "./users/register.js";
import { userCheck } from "./users/userCheck.js";

export const logIn = async () => {
  console.clear();

  figlet.text(
    "Welcome  to  Crypto Trader JS",
    {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    },
    async (err, data) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }

      console.log(chalk.green(data));

      console.log(`
${chalk.green(
  "══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════"
)}
`);
      const { login } = await inquirer.prompt([
        {
          type: "list",
          name: "login",
          message: chalk.bold("Choose an action: \n"),
          choices: [
            {
              name: ` 🔓  ${chalk.yellow("Log in")}`,
              value: "1",
            },
            {
              name: ` 📝  ${chalk.cyan("Register")}`,
              value: "2",
            },
            {
              name: ` ❌  ${chalk.red("Log Out")}`,
              value: "3",
            },
          ],
        },
      ]);
      switch (login) {
        case "1":
          await userCheck();
          break;
        case "2":
          await register();
          break;
        case "3":
        default:
          console.clear();
          console.log(chalk.yellow("Thanks for using Crypto Trader JS. Bye!"));
          process.exit(0);
      }
    }
  );
};
