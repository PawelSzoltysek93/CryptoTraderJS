import inquirer from "inquirer";
import chalk from "chalk";
import axios from "axios";
import { priceTicker } from "./functions/priceTicker.js";
import { makeBid } from "./functions/makeBid.js";

const startApp = async () => {
  console.clear();
  console.log(chalk.blue("Welcome to the CryptoTraderJS !"));

  const { menu } = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "Choose an action:",
      choices: [
        "Show current crypto prices in USD",
        "Make a bid",
        "Show current bids",
        "Close a bid",
        "Exit",
      ],
    },
  ]);
  if (menu === "Show current crypto prices in USD") {
    await priceTicker();
  } else if (menu === "Make a bid") {
    await makeBid();
  } else if (menu === "Exit") {
    return;
  }
};
startApp();
