"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApp = void 0;
const create_table_use_case_1 = require("../domain/use-cases/create-table.use-case");
const save_file_use_case_1 = require("../domain/use-cases/save-file.use-case");
class ServerApp {
    static run(_a) {
        return __awaiter(this, arguments, void 0, function* ({ base, limit, show, destination, name }) {
            console.log("Server running");
            const table = new create_table_use_case_1.CreateTable().execute({ base, limit });
            const wasCreated = new save_file_use_case_1.SaveFileUseCase().execute({
                fileContent: table,
                fileDestination: destination,
                fileName: name,
            });
            if (wasCreated) {
                console.log("File created");
            }
            else {
                console.log("File not created");
            }
            if (show) {
                console.log(table);
            }
        });
    }
}
exports.ServerApp = ServerApp;
