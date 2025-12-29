import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;

    const imagePath = req.file ? req.file.path : null;

    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      image: imagePath,
      createdBy: req.user
    });

    res.json({ message: "Event created", event: newEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// EDIT EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (String(event.createdBy) !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    const imagePath = req.file ? req.file.path : event.image;

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imagePath },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (String(event.createdBy) !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RSVP TO EVENT
export const rsvpEvent = async (req, res) => {
  try {
    const userId = req.user;
    const eventId = req.params.id;

    const updated = await Event.findOneAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: userId }, // user not already attending
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] } // capacity check
      },
      {
        $addToSet: { attendees: userId } // atomic add
      },
      { new: true }
    );

    if (!updated) {
      return res.status(400).json({ message: "Event full or already joined" });
    }

    res.json({ message: "RSVP successful", event: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CANCEL RSVP
export const cancelRsvp = async (req, res) => {
  try {
    const userId = req.user;
    const eventId = req.params.id;

    const updated = await Event.findOneAndUpdate(
      { _id: eventId },
      {
        $pull: { attendees: userId }
      },
      { new: true }
    );

    res.json({ message: "RSVP removed", event: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
