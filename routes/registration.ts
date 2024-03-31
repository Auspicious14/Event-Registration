const express = require("express");
import { EventRegistration } from "../controllers/registration";

const router = express();

router.post("/event-registration", EventRegistration);

export default router;
