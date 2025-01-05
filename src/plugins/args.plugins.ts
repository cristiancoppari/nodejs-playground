import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Multiplication table base",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "List the multiplication table",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show the multiplication table",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "outputs/",
    describe: "Destination of the file",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "Name of the file",
  })
  .check((argv) => {
    if (argv.b < 0) {
      throw "Base must be greater than 0";
    }

    return true;
  })
  .parseSync();
