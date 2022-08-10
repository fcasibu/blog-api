"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
mongoose_1.default
    .connect(process.env.MONGODB)
    .then(() => console.log('Connected to MONGODB'));
const db = mongoose_1.default.connection;
db.on('error', () => console.error('Failed connecting to MONGODB'));
app_1.default.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
