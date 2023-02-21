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
exports.simulateTraffic = exports.destroy = exports.update = exports.show = exports.index = exports.store = void 0;
const trafficDAL = __importStar(require("../../database/data-access/trafficdata"));
const users_1 = require("../../database/data-access/users");
const store = (req, res) => {
    trafficDAL
        .create(req.body)
        .then((pin) => {
        return res
            .status(201)
            .json({ message: "Traffic data created successfully." });
    })
        .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err.message });
    });
};
exports.store = store;
const index = (req, res) => {
    trafficDAL
        .getAll()
        .then((users) => {
        return res.status(200).json({
            message: "All traffic data fetched successfully",
            data: users,
        });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.index = index;
const show = (req, res) => {
    const { id } = req.params;
    trafficDAL
        .show(Number(id))
        .then((user) => {
        return res
            .status(200)
            .json({ message: "Traffic data fetched successfully", data: user });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.show = show;
const update = (req, res) => {
    const { id } = req.params;
    trafficDAL
        .update(Number(id), req.body)
        .then((user) => {
        return res
            .status(200)
            .json({ message: "Traffic data updated successfully", data: user });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.update = update;
const destroy = (req, res) => {
    const { id } = req.params;
    trafficDAL.deleteById(Number(id)).then((isDeleted) => {
        if (isDeleted) {
            return res
                .status(200)
                .json({ message: "Traffic data deleted successfully." });
        }
        return res.status(404).json({ message: "Traffic data not found" });
    });
};
exports.destroy = destroy;
const simulateTraffic = (req, res) => {
    const { id } = req.params;
    (0, users_1.getUserPins)(Number(id))
        .then((pins) => {
        pins.forEach((pin) => { });
        return res
            .status(200)
            .json({ message: "User pins successfully fetched", data: pins });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.simulateTraffic = simulateTraffic;
