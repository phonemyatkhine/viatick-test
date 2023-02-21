"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../../lib/sequelize-config"));
const Pin_1 = __importDefault(require("./Pin"));
class TrafficData extends sequelize_1.Model {
}
TrafficData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    startPinId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Pin_1.default,
            key: "id",
        },
    },
    endPinId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Pin_1.default,
            key: "id",
        },
    },
}, {
    sequelize: sequelize_config_1.default,
    timestamps: true,
    modelName: "TrafficData",
    indexes: [
        {
            unique: true,
            fields: ["startPinId", "endPinId"],
        },
    ],
});
// User.hasMany(Pin);
exports.default = TrafficData;
