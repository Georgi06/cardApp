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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Login = exports.deleteUser = exports.updatePassword = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
var UserModel_1 = require("../models/UserModel");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var saltRounds = 10;
//create
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userData = req.body;
                if (!userData.username) {
                    return [2 /*return*/, res.send({
                            status: 400,
                            message: "No username"
                        })];
                }
                if (!userData.password) {
                    return [2 /*return*/, res.send({
                            status: 400,
                            message: "No password"
                        })];
                }
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.createHashUser(userData)];
            case 1:
                _a.sent();
                res.send({
                    status: 200,
                    message: "User created"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
//read
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new UserModel_1.UserModel().getUsers()];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userModel, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.findUser(id)];
            case 1:
                user = _a.sent();
                console.log(user);
                res.send(user);
                return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
//update
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateUserData, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                updateUserData = req.body;
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.updateUser(id, updateUserData)];
            case 1:
                _a.sent();
                res.send({
                    status: 200,
                    message: "User with id:".concat(id, " updated")
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, updateUserData, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                updateUserData = req.body;
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.updatePassword(username, updateUserData)];
            case 1:
                _a.sent();
                console.log(username);
                res.send({
                    status: 200,
                    message: "User with username:".concat(username, " updated")
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
//delete
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.deleteUser(username)];
            case 1:
                _a.sent();
                res.send({
                    status: 200,
                    message: "User with username:".concat(username, " was deleted")
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, users, userPassword, findUser, findUserRole, dbPassword, matchPassword, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userData = req.body;
                return [4 /*yield*/, new UserModel_1.UserModel().getUsers()];
            case 1:
                users = _a.sent();
                userPassword = userData.password;
                findUser = users.find(function (user) { return user.username == userData.username; });
                findUserRole = findUser.role;
                dbPassword = findUser.password;
                return [4 /*yield*/, bcrypt.compare(userPassword, dbPassword)];
            case 2:
                matchPassword = _a.sent();
                if (!findUser) {
                    return [2 /*return*/, res.send({
                            status: 400,
                            message: "No such user"
                        })];
                }
                if (findUser && findUser.username != userData.username) {
                    return [2 /*return*/, res.send({
                            status: 400,
                            message: "Incorrect username"
                        })];
                }
                if (!matchPassword) {
                    return [2 /*return*/, res.send({
                            status: 400,
                            message: "Incorrect password"
                        })];
                }
                token = jwt.sign({ findUser: findUser }, 'abc123', { expiresIn: '31556926s' });
                //res.send({token})
                res.send({
                    User: findUser.username,
                    Authtoken: token,
                    Role: findUserRole
                });
                return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
