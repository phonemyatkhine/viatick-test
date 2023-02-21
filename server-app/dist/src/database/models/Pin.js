"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../../lib/sequelize-config"));
const User_1 = __importDefault(require("./User"));
class Pin extends sequelize_1.Model {
}
Pin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    long: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: User_1.default,
            key: "id",
        },
    },
}, {
    sequelize: sequelize_config_1.default,
    timestamps: true,
    modelName: "Pin",
});
Pin.belongsTo(User_1.default, { foreignKey: "userId" });
exports.default = Pin;
