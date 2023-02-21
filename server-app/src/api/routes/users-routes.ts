import { Router } from "express";

import {
  index,
  show,
  store,
  destroy,
  update,
  indexPins,
  simulateRoute,
} from "../controllers/users";
// import { index as indexDevices } from "../controllers/deviceUsers";

const router = Router();

router.post("/", store);
router.get("/", index);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get("/:id/pins/", indexPins);
router.get("/:id/pins/:pinId/simulate-route/", simulateRoute);
export default router;
