const chalk = require("chalk");
const ip = require("ip");

const divider = chalk.gray("\n-----------------------------------");

/**
 * Logger middleware, you can customize it to make messages more personal
 */

const Logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },
  // Called whenever there's an data we want to print
  success: (data) => {
    console.log(chalk.green(data));
  },
  // Called whenever there's an warning
  warn: (data) => {
    console.warn(chalk.yellow(data));
  },
  dbConn: (host, error) => {
    if (host) {
      console.log(chalk.bold.bgBlue("Mongodb Connected, host:  ", host));
    } else {
      console.error(chalk.red(error));
    }
  },
  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green("✓")}`);

    console.log(`
        ${chalk.bold("Access URLs:")}${divider}
          Localhost: ${chalk.magenta(`http://${host}:${port}`)}
         LAN: ${chalk.magenta(
           `http://${ip.address()}:${port}`
         )}${divider}${chalk.blue(`Press ${chalk.italic("CTRL-C")} to stop`)}
    `);
  },
};

module.exports = Logger;
