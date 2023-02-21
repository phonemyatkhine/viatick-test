"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateRoute = exports.indexPins = exports.destroy = exports.update = exports.show = exports.index = exports.store = void 0;
const userDAL = __importStar(require("../../database/data-access/users"));
const pinDAL = __importStar(require("../../database/data-access/pins"));
const distance_helper_1 = require("../../lib/distance-helper");
const graph_helper_1 = require("../../lib/graph-helper");
const dijkstra_algorithm_1 = require("../../lib/dijkstra-algorithm");
const store = (req, res) => {
    userDAL
        .create(req.body)
        .then((user) => {
        return res.status(201).json({ message: "User created successfully." });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.store = store;
const index = (req, res) => {
    userDAL
        .getAll()
        .then((users) => {
        return res
            .status(200)
            .json({ message: "Users fetched successfully", data: users });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.index = index;
const show = (req, res) => {
    const { id } = req.params;
    userDAL
        .show(Number(id))
        .then((user) => {
        return res
            .status(200)
            .json({ message: "User fetched successfully", data: user });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.show = show;
const update = (req, res) => {
    const { id } = req.params;
    userDAL
        .update(Number(id), req.body)
        .then((user) => {
        return res
            .status(200)
            .json({ message: "User updated successfully", data: user });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.update = update;
const destroy = (req, res) => {
    const { id } = req.params;
    userDAL.deleteById(Number(id)).then((isDeleted) => {
        if (isDeleted) {
            return res.status(200).json({ message: "User deleted successfully." });
        }
        return res.status(404).json({ message: "User not found" });
    });
};
exports.destroy = destroy;
const indexPins = (req, res) => {
    const { id } = req.params;
    userDAL
        .getUserPins(Number(id))
        .then((pins) => {
        return res
            .status(200)
            .json({ message: "User pins successfully fetched", data: pins });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.indexPins = indexPins;
const simulateRoute = async (req, res) => {
    const { pinId } = req.params;
    const { id } = req.params;
    const [startPin, pins] = await Promise.all([
        pinDAL.show(Number(pinId)),
        userDAL.getUserPins(Number(id)),
    ]);
    const distArr = (0, distance_helper_1.getDistArr)(startPin, pins);
    //end Pin will be furtherest pin from the start pin
    const endPinId = (0, distance_helper_1.getFurtherestPinId)(distArr);
    const endPin = await pinDAL.show(endPinId);
    const distances = (0, distance_helper_1.getDistances)(pins);
    const graph = (0, graph_helper_1.generateGraph)(pins, distances);
    const path = (0, dijkstra_algorithm_1.dijkstra)(graph, startPin, endPin);
    const visitedNodes = new Object();
    for (let index = 0; index < path.length; index++) {
        visitedNodes[index] = await pinDAL.show(path[index]);
    }
    return res
        .status(200)
        .json({ message: "Route successfully generated", data: visitedNodes });
};
exports.simulateRoute = simulateRoute;
