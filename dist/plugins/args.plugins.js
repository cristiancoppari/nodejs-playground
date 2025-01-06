"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
exports.argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
