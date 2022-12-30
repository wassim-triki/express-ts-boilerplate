import chalk from 'chalk';

export default class Logger {
  public static info = (args: any) =>
    console.log(
      chalk.blue(
        `[${new Date().toLocaleString()}] [${chalk.bold('INFO')}]`,
        typeof args === 'string' ? chalk.blueBright(args) : args
      )
    );
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(
        `[${new Date().toLocaleString()}] [${chalk.bold('WARN')}]`,
        typeof args === 'string' ? chalk.yellowBright(args) : args
      )
    );
  public static error = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [${chalk.bold('ERROR')}]`),
      typeof args === 'string' ? chalk.redBright(args) : args
    );
}
