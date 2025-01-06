"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveFileUseCase = void 0;
const fs_1 = __importDefault(require("fs"));
class SaveFileUseCase {
    constructor( /** repository */) { }
    execute({ fileContent, fileDestination = "outputs/", fileName = "table", }) {
        try {
            const outputPath = fileDestination;
            fs_1.default.mkdirSync(outputPath, { recursive: true });
            fs_1.default.writeFileSync(`${outputPath}${fileName}.txt`, fileContent);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.SaveFileUseCase = SaveFileUseCase;
