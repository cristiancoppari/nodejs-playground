"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable = void 0;
class CreateTable {
    /**
     * DI - Dependency Injection
     */
    constructor() { }
    execute({ base, limit = 10 }) {
        let outputMessage = "";
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${Number(base) * i}\n`;
        }
        return outputMessage;
    }
}
exports.CreateTable = CreateTable;
