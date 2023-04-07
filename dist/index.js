"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./http/Config");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const brandRoute_1 = __importDefault(require("./http/Routes/brandRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = process.env.PORT;
(0, Config_1.dataBaseConnection)();
app.get('/', (req, res) => {
    res.send('Hii');
});
app.use('/api/brand', brandRoute_1.default);
app.listen(port || 5000, () => {
    console.log('Server running smoothly');
});
