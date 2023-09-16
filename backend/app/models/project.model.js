const mongoose = require("mongoose");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: [
      {
        name: { type: String, required: true },
        experiences: { type: String, required: false },
      },
    ],
    contributors: [
      {
        name: { type: String, required: false },
        experiences: { type: String, required: false },
      },
    ],
    category: { type: String, required: true },
    links: [
      {
        // platform: { type: String, required: false },
        source: { type: String, required: true },
      },
    ],
    publisher: { type: String, required: true },
    image: { type: String, required: false },
    topic: { type: String, required: true },
    publishedDate: { type: Date, required: false },
    personal: { type: Boolean, default: true },
    isInstitute: { type: Boolean, default: false },
    projectFile: { type: String, required: true },
    keywords: [{ type: String, required: false }],
    uploader: {
      name: { type: String, required: true },
      mobile: { type: String, required: false },
    },
    ownedBy: [
      {
        type: String,
        required: true,
      },
    ],
  })
);

module.exports = Project;
