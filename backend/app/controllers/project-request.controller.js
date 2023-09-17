const db = require("../models");
const Student = db.student;
const Project = db.project;
const Institute = db.institute;
const projectRequest = db.projectRequest;

exports.getProjectAddRequestAll = async (req, res) => {
  const ID = req.userId;
  try {
    const referral = await Institute.findById(ID).select("referral");
    if (!referral)
      return res.status(404).send({ message: "No institute found" });
    const requests = await projectRequest
      .find({ referral: referral.referral })
      .select("-data.description -data.images -data.links")
      .where("seen")
      .equals("false");
    return res.status(200).send({ requests });
  } catch (error) {
    return res.status(500).send({ message: "Server failure" });
  }
};

exports.seenProject = async (req, res) => {
  const ID = req.userId;
  const reqID = req.body.reqId;
  const accepted = req.body.accepted;
  try {
    const referral = await Institute.findById(ID).select("referral");
    if (!referral)
      return res.status(404).send({ message: "No institute found" });
    const request = await projectRequest.findById(reqID);

    if (!request) return res.status(404).send({ message: "No request found" });

    if (accepted) {
      request.seen = !request.seen;
      request.accepted = true;
      await request.save();
      // * do other things
      return res.status(200).send({ message: "Request accepted successfully" });
    } else {
      await request.deleteOne();
      return res.status(200).send({ message: "Request denied successfully" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server failure" });
  }
};

exports.getOneProject = async (req, res) => {
  const projId = req.body.projectId;

  try {
    const response = await projectRequest.findById(projId);

    if (!response)
      return res.status(404).send({ message: "Project not found" });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ message: "Server failure" });
  }
};

exports.searchProject = async (req, res) => {
  try {
    const limit = req.query?.limit || 20;
    // let keywords = req.query?.keywords
    //   ? req.query?.keywords?.split(",")?.join(" ")
    //   : null;
    // console.log(keywords);

    const project = await Project.find({
      $or: [
        { title: { $regex: `^${req.query?.title}`, $options: "i" } }, // * i : non-case sensitive
        {
          description: { $regex: `^${req.query?.description}`, $options: "i" },
        },
        {
          category: { $regex: `^${req.query?.category}`, $options: "i" },
        },
        {
          topic: { $regex: `^${req.query?.topic}`, $options: "i" },
        },
        {
          publisher: { $regex: `^${req.query?.publisher}`, $options: "i" },
        },
        {
          authors: {
            $elemMatch: {
              name: { $regex: `^${req.query?.author}`, $options: "i" },
            },
          },
        },
        {
          keywords: {
            $elemMatch: {
              $regex: `^${req.query?.keyword}`,
              $options: "i",
            },
          },
        },
      ],
    })
      .limit(parseInt(limit))
      .select("title description image authors");

    if (!project) return res.status(404).send({ message: "No result found" });
    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server failure" });
  }
};

exports.getProjects = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    const pipeline = [
      { $sample: { size: parseInt(limit) } },
      { $limit: parseInt(limit) },
    ];
    const project = await Project.aggregate(pipeline);
    if (!project) return res.status(404).send({ message: "Not found" });
    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server failure" });
  }
};

exports.getProjectRecommendation = async (req, res) => {
  const { interest } = req.body;

  try {
    const pipeline = [
      {
        $match: {
          category: { $in: interest },
        },
      },
      {
        $sample: { size: 20 },
      },
    ];

    const documents = await Project.aggregate(pipeline);

    if (!documents)
      return res.status(404).send({ message: "No interest found" });

    return res.status(200).send(documents);
  } catch (error) {
    return res.status(500).send({ message: "Server failure" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateArgument(id))
      return res.status(404).send({ message: "Invalid ID detected" });
    const project = await Project.findById(id);
    if (!project) return res.status(404).send({ message: "No project found" });
    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server failure" });
  }
};

function validateArgument(argument) {
  if (typeof argument !== "string") {
    return false;
  }

  if (argument.length === 12) {
    return true;
  }

  if (argument.match(/^[0-9a-f]{24}$/)) {
    return true;
  }

  return false;
}
