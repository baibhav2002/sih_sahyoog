const mongoose = require("mongoose");

const ProjectInstitute = mongoose.model(
  "ProjectInstitute",
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
        platform: { type: String, required: true },
        source: { type: String, required: true },
      },
    ],
    publisher: { type: String, required: true },
    images: [{ source: { type: String, required: false } }],
    topic: { type: String, required: true },
    publishedDate: { type: Date, required: false },
    personal: { type: Boolean, default: false },
    isInstitute: { type: Boolean, default: true },
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

module.exports = ProjectInstitute;
