import fs from "fs";
import { argv } from "./plugins/args.plugins";

let outputMessage = "";
const base = argv.b;
const outputPath = "outputs/";

const headerMessage = `======================\n Tabla del ${base}\n======================\n`;

for (let i = 1; i <= argv.l; i++) {
  outputMessage += `${base} x ${i} = ${Number(base) * i}\n`;
}

outputMessage = headerMessage + outputMessage;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}tabla-${base}.txt`, outputMessage);

if (argv.s) {
  console.log(outputMessage);
}

console.log("File created");
