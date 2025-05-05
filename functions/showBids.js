import fs from "fs";
import axios from "axios";
import chalk from "chalk";

export const showCurrentBids = async () => {
  const filePath = "./bids.json";
  let bids = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    if (data.trim().length > 0) {
      bids = JSON.parse(data);
    } else {
      console.log(chalk.yellow("No bids found."));
      return;
    }
  } else {
    console.log(chalk.yellow("No bids file found."));
    return;
  }

  const coins = [...new Set(bids.map((bid) => bid.coin.toLowerCase()))];

  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
        ","
      )}&vs_currencies=usd`
    );
    const prices = res.data;

    bids.forEach((bid) => {
      const currentPrice = prices[bid.coin.toLowerCase()]?.usd;
      if (currentPrice === undefined) {
        console.log(
          `${chalk.bold(bid.coin)} | Amount: ${
            bid.amount
          } | Buy: $${bid.buyPrice.toFixed(2)} | Now: N/A | P/L: ${chalk.gray(
            "No price data"
          )}`
        );
      } else {
        const diff = (currentPrice - bid.buyPrice) * bid.amount;
        const profitLossValue = `${diff >= 0 ? "+" : ""}${diff.toFixed(2)} USD`;
        const colorFn = diff >= 0 ? chalk.green : chalk.red;

        console.log(
          `${chalk.bold(bid.coin)} | Amount: ${
            bid.amount
          } | Buy: $${bid.buyPrice.toFixed(2)} | Now: $${currentPrice.toFixed(
            2
          )} | Profit/Loss: ${colorFn(profitLossValue)} | Opened: ${new Date(
            bid.openedAt
          ).toLocaleString()}`
        );
      }
    });
  } catch (err) {
    console.error(chalk.red("Error fetching current prices:", err.message));
  }
};
