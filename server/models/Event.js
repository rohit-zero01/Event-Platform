const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  capacity: Number,
  imageURL: String,

  // ✅ correct type
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
