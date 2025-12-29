import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { rsvpEvent, cancelRsvp } from "../controllers/eventController.js";


const router = express.Router();

// CREATE EVENT (with image)
router.post("/", protect, upload.single("image"), createEvent);

// GET ALL EVENTS
router.get("/", getEvents);

// UPDATE EVENT
router.put("/:id", protect, upload.single("image"), updateEvent);

// DELETE EVENT
router.delete("/:id", protect, deleteEvent);

// RSVP
router.post("/:id/rsvp", protect, rsvpEvent);

// CANCEL RSVP
router.post("/:id/cancel", protect, cancelRsvp);

export default router;
