import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { startApp } from "../app.js";
import { goBackToMenu } from "./goBacktoMenu.js";

export const closeBid = async () => {
  const filePath = path.join("./bids.json");

  if (!fs.existsSync(filePath)) {
    console.log(chalk.yellow("No open bids found."));
    return startApp();
  }

  const bidsData = fs.readFileSync(filePath, "utf-8");
  let bids = JSON.parse(bidsData);

  if (bids.length === 0) {
    console.log(chalk.yellow("No open bids found."));
    return startApp();
  }

  const choices = bids.map((bid, index) => ({
    name: `${index + 1}. ${bid.coin.toUpperCase()} | Amount: ${
      bid.amount
    } | Buy: $${bid.buyPrice.toFixed(2)} | Opened: ${new Date(
      bid.time
    ).toLocaleString()}`,
    value: index,
  }));

  choices.push(new inquirer.Separator());
  choices.push({ name: "⬅️  Go back to main menu", value: -1 });

  const { selectedIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedIndex",
      message: "Select a bid to close:",
      choices,
    },
  ]);

  if (selectedIndex === -1) {
    return startApp();
  }
  const closedBid = bids[selectedIndex];
  bids.splice(selectedIndex, 1);

  fs.writeFileSync(filePath, JSON.stringify(bids, null, 2), "utf-8");

  console.log(
    chalk.green(
      `✅ Closed bid for ${closedBid.coin} (Amount: ${
        closedBid.amount
      }) opened on ${new Date(closedBid.time).toLocaleString()}`
    )
  );
  await goBackToMenu();
};
