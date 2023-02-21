import Pin from "../models/Pin";
import { PinInputData, PinOutPutData } from "../models/Pin";

export const create = async (payload: PinInputData): Promise<PinOutPutData> => {
  return await Pin.create(payload);
};

export const show = async (id: number): Promise<PinOutPutData> => {
  const pin = await Pin.findByPk(id);
  if (!pin) {
    var err: any = new Error("Pin does not exist");
    err.code = 404;
    throw err;
  }
  return await pin;
};
export const update = async (
  id: number,
  payload: Partial<PinInputData>
): Promise<PinOutPutData> => {
  const pin = await Pin.findByPk(id);
  if (!pin) {
    var err: any = new Error("Pin does not exist");
    err.code = 404;
    throw err;
  }
  return await (pin as Pin).update(payload);
};
export const getAll = async (): Promise<PinOutPutData[]> => {
  return Pin.findAll();
};
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedPinCount = await Pin.destroy({
    where: { id },
  });
  return !!deletedPinCount;
};
