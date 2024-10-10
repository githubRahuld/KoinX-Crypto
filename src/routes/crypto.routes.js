import { Router } from "express";
import {
    fetchLatestData,
    findDerivation,
} from "../controllers/cryptoData.controller.js";

const router = Router();

router.route("/stats").get(fetchLatestData);
router.route("/deviation").get(findDerivation);

export default router;
