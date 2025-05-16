import figlet from "figlet";
import chalk from "chalk";

figlet.text(
  "Crypto Trader JS",
  {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }

    console.log(chalk.green(data));

    const menu = `
${chalk.green(
  "═════════════════════════════════════════════════════════════════════"
)}

 [1] 💰  ${chalk.yellow("Live Crypto Prices")}
 [2] 📈  ${chalk.cyan("View Market Trends")}
 [3] 📊  ${chalk.magenta("Portfolio Overview")}
 [4] ⚙️  ${chalk.blue("Settings")}
 [0] ❌  ${chalk.red("Exit")}

${chalk.green(
  "═════════════════════════════════════════════════════════════════════"
)}
  `;

    console.log(menu);
  }
);
