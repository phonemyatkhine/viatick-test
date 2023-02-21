import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../lib/sequelize-config";
import Pin from "./Pin";

interface UserAttributes {
  id: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInputData
  extends Optional<UserAttributes, "id" | "email"> {}
export interface UserOutPutData extends Required<UserAttributes> {}

class User
  extends Model<UserAttributes, UserInputData>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique(value: string) {
          return User.findOne({ where: { email: value } }).then((user) => {
            if (user) {
              var err: any = new Error("User email is already taken");
              err.code = 422;
              throw err;
            }
          });
        },
      },
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    modelName: "User",
  }
);
// User.hasMany(Pin);
export default User;
