import { Request, RequestHandler, Response } from "express";
import * as pinDAL from "../../database/data-access/pins";
import { checkPinCount } from "../../database/data-access/users";
import { PinInputData } from "../../database/models/Pin";

export const store: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  const pinCount: number = await checkPinCount(Number(userId));

  if (pinCount > 25) {
    return res.status(400).json({ message: "Maximum pin count reached" });
  }
  pinDAL
    .create(req.body as PinInputData)
    .then((pin) => {
      return res
        .status(201)
        .json({ message: "Pin created successfully.", data: pin });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const index: RequestHandler = (req, res) => {
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

export const show: RequestHandler = (req, res) => {
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

export const update: RequestHandler = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(req.body);

  pinDAL
    .update(Number(id), req.body as PinInputData)
    .then((pin) => {
      return res
        .status(200)
        .json({ message: "Pin updated successfully", data: pin });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const destroy: RequestHandler = (req, res) => {
  const { id } = req.params;
  pinDAL.deleteById(Number(id)).then((isDeleted) => {
    if (isDeleted) {
      return res.status(200).json({ message: "Pin deleted successfully." });
    }
    return res.status(404).json({ message: "Pin not found" });
  });
};
