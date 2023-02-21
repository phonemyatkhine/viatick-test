import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../lib/sequelize-config";
import User from "./User";

interface PinAttributes {
  id: number;
  long: number;
  lat: number;
  userId: number;
}
export interface PinInputData extends Required<PinAttributes> {}
export interface PinOutPutData extends Required<PinAttributes> {}

class Pin extends Model implements PinAttributes {
  public id!: number;
  public long!: number;
  public lat!: number;
  public userId!: number;
}

Pin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    long: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Pin",
  }
);
Pin.belongsTo(User, { foreignKey: "userId" });
export default Pin;
