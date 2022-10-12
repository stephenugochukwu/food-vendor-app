"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const vendor_1 = __importDefault(require("./routes/vendor"));
const admin_1 = __importDefault(require("./routes/admin"));
const database_config_1 = __importDefault(require("./config/database.config"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/", index_1.default);
app.use("/users", users_1.default);
app.use("/admin", admin_1.default);
app.use("/vendors", vendor_1.default);
// db.sync({ force: true }) - to reset the database
database_config_1.default.sync()
    .then(() => {
    console.log(`Database connected successfully`);
})
    .catch((err) => console.log(err));
exports.default = app;
