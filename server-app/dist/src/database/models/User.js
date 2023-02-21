"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../../lib/sequelize-config"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUnique(value) {
                return User.findOne({ where: { email: value } }).then((user) => {
                    if (user) {
                        var err = new Error("User email is already taken");
                        err.code = 422;
                        throw err;
                    }
                });
            },
        },
    },
}, {
    sequelize: sequelize_config_1.default,
    timestamps: true,
    modelName: "User",
});
// User.hasMany(Pin);
exports.default = User;
