const router = require("express").Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");

const multer = require("multer");
const { storage } = require("../config/cloudinary");

const cloudinary = require("../config/cloudinary");
const upload = multer({ dest: "temp/" });

router.post("/", auth, upload.single("image"), async (req, res) => {

  try {
    let imageURL = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "events",
      });
      imageURL = result.secure_url;
    }

    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity: req.body.capacity,
      imageURL,
      createdBy: req.user,
      attendees: [],
    });

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// GET ALL EVENTS
router.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

// GET SINGLE EVENT
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

// DELETE EVENT (OWNER ONLY)
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    if (String(event.createdBy) !== String(req.user))
      return res.status(403).json({ msg: "Not authorized" });

    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
});

// UPDATE EVENT (OWNER ONLY – no image update yet)
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    if (String(event.createdBy) !== String(req.user))
      return res.status(403).json({ msg: "Not authorized" });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        capacity: req.body.capacity,
      },
      { new: true }
    );

    res.json(updatedEvent);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});

// RSVP
router.post("/:id/rsvp", auth, async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $ne: req.user },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
      },
      { $push: { attendees: req.user } },
      { new: true }
    );

    if (!updatedEvent)
      return res.json({ msg: "Event is full or already joined" });

    res.json(updatedEvent);
  } catch {
    res.status(500).json({ msg: "RSVP failed" });
  }
});

// UN-RSVP
router.post("/:id/unrsvp", auth, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $pull: { attendees: req.user } },
      { new: true }
    );
    res.json(updatedEvent);
  } catch {
    res.status(500).json({ msg: "Un-RSVP failed" });
  }
});

module.exports = router;
