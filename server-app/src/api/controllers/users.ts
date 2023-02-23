import { Request, RequestHandler, Response } from "express";
import * as userDAL from "../../database/data-access/users";
import User, { UserInputData } from "../../database/models/User";
import * as pinDAL from "../../database/data-access/pins";
import {
  getDistances,
  getDistArr,
  getFurtherestPinId,
} from "../../lib/distance-helper";
import { PinOutPutData } from "../../database/models/Pin";
import { generateGraph } from "../../lib/graph-helper";
import { dijkstra } from "../../lib/dijkstra-algorithm";

export const store: RequestHandler = (req, res) => {
  userDAL
    .create(req.body as UserInputData)
    .then((user) => {
      return res.status(201).json({ message: "User created successfully." });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const index: RequestHandler = (req, res) => {
  userDAL
    .getAll()
    .then((users) => {
      return res
        .status(200)
        .json({ message: "Users fetched successfully", data: users });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const show: RequestHandler = (req, res) => {
  const { id } = req.params;
  userDAL
    .show(Number(id))
    .then((user) => {
      return res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const update: RequestHandler = (req, res) => {
  const { id } = req.params;

  userDAL
    .update(Number(id), req.body as UserInputData)
    .then((user) => {
      return res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const destroy: RequestHandler = (req, res) => {
  const { id } = req.params;
  userDAL.deleteById(Number(id)).then((isDeleted) => {
    if (isDeleted) {
      return res.status(200).json({ message: "User deleted successfully." });
    }
    return res.status(404).json({ message: "User not found" });
  });
};

export const indexPins: RequestHandler = (req, res) => {
  const { id } = req.params;
  userDAL
    .getUserPins(Number(id))
    .then((pins) => {
      return res
        .status(200)
        .json({ message: "User pins successfully fetched", data: pins });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const simulateRoute: RequestHandler = async (req, res) => {
  const { pinId } = req.params;
  const { id } = req.params;
  const [startPin, pins] = await Promise.all([
    pinDAL.show(Number(pinId)),
    userDAL.getUserPins(Number(id)),
  ]);
  const distArr = getDistArr(startPin, pins);
  //end Pin will be furtherest pin from the start pin
  const endPinId: number = getFurtherestPinId(distArr);
  const endPin: PinOutPutData = await pinDAL.show(endPinId);
  const distances: any = getDistances(pins);
  const graph: any = generateGraph(pins, distances);
  const path = dijkstra(graph, startPin, endPin);
  const visitedNodes: any = new Object();
  for (let index = 0; index < path.length; index++) {
    visitedNodes[index] = await pinDAL.show(path[index]);
  }
  return res
    .status(200)
    .json({ message: "Route successfully generated", data: visitedNodes });
};
