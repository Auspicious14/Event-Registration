const express = require("express");
import {
  EventRegistration,
  getAllAttendees,
  getAllAttendeesByEvent,
} from "../controllers/registration";

const router = express();

router.post("/event-registration", EventRegistration);
router.get("/attendees/event", getAllAttendeesByEvent);
router.get("/attendees", getAllAttendees);

export default router;
