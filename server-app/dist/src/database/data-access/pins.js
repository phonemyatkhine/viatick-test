"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.getAll = exports.update = exports.show = exports.create = void 0;
const Pin_1 = __importDefault(require("../models/Pin"));
const create = async (payload) => {
    return await Pin_1.default.create(payload);
};
exports.create = create;
const show = async (id) => {
    const pin = await Pin_1.default.findByPk(id);
    if (!pin) {
        var err = new Error("Pin does not exist");
        err.code = 404;
        throw err;
    }
    return await pin;
};
exports.show = show;
const update = async (id, payload) => {
    const pin = await Pin_1.default.findByPk(id);
    if (!pin) {
        var err = new Error("Pin does not exist");
        err.code = 404;
        throw err;
    }
    return await pin.update(payload);
};
exports.update = update;
const getAll = async () => {
    return Pin_1.default.findAll();
};
exports.getAll = getAll;
const deleteById = async (id) => {
    const deletedPinCount = await Pin_1.default.destroy({
        where: { id },
    });
    return !!deletedPinCount;
};
exports.deleteById = deleteById;
