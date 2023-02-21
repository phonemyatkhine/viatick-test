import { Router } from "express";

import { index, show, store, destroy, update } from "../controllers/pins";

const router = Router();

router.post("/", store);
router.get("/", index);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
