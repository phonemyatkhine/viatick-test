"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.getAll = exports.update = exports.show = exports.create = void 0;
const TrafficData_1 = __importDefault(require("../models/TrafficData"));
const create = async (payload) => {
    return await TrafficData_1.default.create(payload);
};
exports.create = create;
const show = async (id) => {
    const trafficData = await TrafficData_1.default.findByPk(id);
    if (!trafficData) {
        var err = new Error("TrafficData does not exist");
        err.code = 404;
        throw err;
    }
    return await trafficData;
};
exports.show = show;
const update = async (id, payload) => {
    const trafficData = await TrafficData_1.default.findByPk(id);
    if (!trafficData) {
        var err = new Error("TrafficData does not exist");
        err.code = 404;
        throw err;
    }
    return await trafficData.update(payload);
};
exports.update = update;
const getAll = async () => {
    return TrafficData_1.default.findAll();
};
exports.getAll = getAll;
const deleteById = async (id) => {
    const deletedTrafficDataCount = await TrafficData_1.default.destroy({
        where: { id },
    });
    return !!deletedTrafficDataCount;
};
exports.deleteById = deleteById;
