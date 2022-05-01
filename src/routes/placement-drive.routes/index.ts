import { Router } from "express";

const router = Router();

router.use("/placement-drive", require("./placement-drive"));
router.use("/placement-drive-request", require("./placement-drive-request"));

module.exports = router;
