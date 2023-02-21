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
exports.destroy = exports.update = exports.show = exports.index = exports.store = void 0;
const pinDAL = __importStar(require("../../database/data-access/pins"));
const users_1 = require("../../database/data-access/users");
const store = async (req, res) => {
    const { userId } = req.body;
    const pinCount = await (0, users_1.checkPinCount)(Number(userId));
    if (pinCount > 25) {
        return res.status(400).json({ message: "Maximum pin count reached" });
    }
    pinDAL
        .create(req.body)
        .then((pin) => {
        return res
            .status(201)
            .json({ message: "Pin created successfully.", data: pin });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.store = store;
const index = (req, res) => {
    pinDAL
        .getAll()
        .then((pins) => {
        return res
            .status(200)
            .json({ message: "Pins fetched successfully", data: pins });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.index = index;
const show = (req, res) => {
    const { id } = req.params;
    pinDAL
        .show(Number(id))
        .then((pin) => {
        return res
            .status(200)
            .json({ message: "Pin fetched successfully", data: pin });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.show = show;
const update = (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    console.log(req.body);
    pinDAL
        .update(Number(id), req.body)
        .then((pin) => {
        return res
            .status(200)
            .json({ message: "Pin updated successfully", data: pin });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
};
exports.update = update;
const destroy = (req, res) => {
    const { id } = req.params;
    pinDAL.deleteById(Number(id)).then((isDeleted) => {
        if (isDeleted) {
            return res.status(200).json({ message: "Pin deleted successfully." });
        }
        return res.status(404).json({ message: "Pin not found" });
    });
};
exports.destroy = destroy;
