import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

export const priceTicker = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,near&vs_currencies=usd"
    );
    console.log(chalk.green("Current prices for BTC and ETH in USD: "));
    const prices = response.data;
    console.table(
      Object.entries(prices).map(([coin, data]) => ({
        Coin: coin.charAt(0).toUpperCase() + coin.slice(1),
        PriceUSD: `$${data.usd.toLocaleString()}`,
      }))
    );
  } catch (error) {
    console.error(chalk.red("Something went wrong :( API is not working!"));
  }
};
