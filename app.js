import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { priceTicker } from "./main_functions/marketPrices.js";
import { makeBid } from "./main_functions/placeOrder.js";
import { showCurrentBids } from "./main_functions/activeOrders.js";
import { closeBid } from "./main_functions/closeOrder.js";
import { logIn } from "./landingPage.js";

export const startApp = async () => {
  console.clear();

  figlet.text(
    "Crypto Trader JS",
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
  "══════════════════════════════════════════════════════════════════════════════════"
)}
`);
      const { choice } = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: chalk.bold("Choose an action: \n"),
          choices: [
            {
              name: ` 📊  ${chalk.yellow("Market Prices")}`,
              value: "1",
            },
            {
              name: ` 🟢  ${chalk.cyan("Place Order")}`,
              value: "2",
            },
            {
              name: ` 📋  ${chalk.magenta("Active Orders")}`,
              value: "3",
            },
            {
              name: ` 🔴  ${chalk.blue("Close Order")}`,
              value: "4",
            },
            {
              name: ` ❌  ${chalk.red("Log Out")}`,
              value: "0",
            },
          ],
        },
      ]);

      console.log(`
${chalk.green(
  "═════════════════════════════════════════════════════════════════════"
)}
`);

      switch (choice) {
        case "1":
          await priceTicker();
          break;
        case "2":
          await makeBid();
          break;
        case "3":
          await showCurrentBids();
          break;
        case "4":
          await closeBid();
          break;
        case "0":
        default:
          console.clear();
          console.log(chalk.yellow("Thanks for using Crypto Trader JS. Bye!"));
          process.exit(0);
      }
    }
  );
};
logIn();
