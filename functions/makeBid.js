import fs from "fs";
import path from "path";
import axios from "axios";
import chalk from "chalk";
import inquirer from "inquirer";
import { time } from "console";

export const makeBid = async () => {
  const coins = ["bitcoin", "ethereum", "solana", "near"];
  const { coin, amount } = await inquirer.prompt([
    {
      type: "list",
      name: "coin",
      message: "Select a coin to bid on:",
      choices: coins,
    },
    {
      type: "input",
      name: "amount",
      message: "Enter the amount you want to bid:",
    },
  ]);
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
    );
    if (!res.data[coin] || !res.data[coin].usd) {
      throw new Error("Invalid coin data received from API");
    }
    const price = res.data[coin].usd;
    const bid = {
      coin,
      amount: parseFloat(amount.replace(",", ".")),
      buyPrice: price,
      time: new Date().toLocaleString(),
    };
    const filePath = path.join("bids.json");
    let bids = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      if (data.trim().length === 0) {
        bids = [];
      } else {
        bids = JSON.parse(data);
      }
    }
    bids.push(bid);
    fs.writeFileSync(filePath, JSON.stringify(bids, null, 2), "utf-8");

    console.log(chalk.green(`Bid placed successfully!`));
  } catch (error) {
    console.error(chalk.red("Error placing bid: "), error.message);
  }
};
