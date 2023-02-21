"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPinCount = exports.getUserPins = exports.deleteById = exports.getAll = exports.update = exports.show = exports.create = void 0;
const Pin_1 = __importDefault(require("../models/Pin"));
const User_1 = __importDefault(require("../models/User"));
const create = async (payload) => {
    console.log(payload);
    return await User_1.default.create(payload);
};
exports.create = create;
const show = async (id) => {
    const user = await User_1.default.findByPk(id);
    if (!user) {
        var err = new Error("User does not exist");
        err.code = 404;
        throw err;
    }
    return await user;
};
exports.show = show;
const update = async (id, payload) => {
    const user = await User_1.default.findByPk(id);
    if (!user) {
        var err = new Error("User does not exist");
        err.code = 404;
        throw err;
    }
    return await user.update(payload);
};
exports.update = update;
const getAll = async () => {
    return User_1.default.findAll();
};
exports.getAll = getAll;
const deleteById = async (id) => {
    const deletedUserCount = await User_1.default.destroy({
        where: { id },
    });
    return !!deletedUserCount;
};
exports.deleteById = deleteById;
const getUserPins = async (id) => {
    const userPins = await Pin_1.default.findAll({
        where: { userId: Number(id) },
    });
    if (!userPins) {
        var err = new Error("Pins does not exist");
        err.code = 404;
        throw err;
    }
    return userPins;
};
exports.getUserPins = getUserPins;
const checkPinCount = async (id) => {
    const userPinCount = await Pin_1.default.count({
        where: { userId: Number(id) }
    });
    return userPinCount;
};
exports.checkPinCount = checkPinCount;
