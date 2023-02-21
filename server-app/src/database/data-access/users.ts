import Pin, { PinOutPutData } from "../models/Pin";
import User from "../models/User";
import { UserInputData, UserOutPutData } from "../models/User";

export const create = async (
  payload: UserInputData
): Promise<UserOutPutData> => {
  console.log(payload);

  return await User.create(payload);
};
export const show = async (id: number): Promise<UserOutPutData> => {
  const user = await User.findByPk(id);
  if (!user) {
    var err: any = new Error("User does not exist");
    err.code = 404;
    throw err;
  }
  return await user;
};

export const update = async (
  id: number,
  payload: Partial<UserInputData>
): Promise<UserOutPutData> => {
  const user = await User.findByPk(id);
  if (!user) {
    var err: any = new Error("User does not exist");
    err.code = 404;
    throw err;
  }
  return await (user as User).update(payload);
};

export const getAll = async (): Promise<UserOutPutData[]> => {
  return User.findAll();
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const getUserPins = async (id: number): Promise<PinOutPutData[]> => {
  const userPins = await Pin.findAll({
    where: { userId: Number(id) },
  });
  if (!userPins) {
    var err: any = new Error("Pins does not exist");
    err.code = 404;
    throw err;
  }
  return userPins;
};

export const checkPinCount = async (id : number) => {
  const userPinCount = await Pin.count({
    where : {userId : Number(id)}
  })
  return userPinCount
}