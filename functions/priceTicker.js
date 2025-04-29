import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

export const priceTicker = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );
    console.log(chalk.green("Current prices for BTC and ETH in USD: "));
    console.log(response.data);
  } catch (error) {
    console.error(chalk.red("Something went wrong :( API is not working!"));
  }
};
