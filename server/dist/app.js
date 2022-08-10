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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("./model/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const user_2 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(payload.id, '-password').exec();
        if (!user)
            return done(null, false, { message: 'User does not exist' });
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
app.use(passport_1.default.initialize());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/auth', auth_1.default);
app.use('/api/posts', post_1.default);
app.use('/api/users', user_2.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).json({
        status: 'fail',
        message: err.message,
        stack: err.stack
    });
});
exports.default = app;
