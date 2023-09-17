const db = require("../models");
const Student = db.student;
const Project = db.project;
const projectRequest = db.projectRequest;

exports.createProject = async (req, res) => {
  const {
    title,
    description,
    authors,
    contributors,
    category,
    links,
    projectFile,
    image,
    topic,
    personal,
  } = req.body;

  const project = new Project({
    title,
    description,
    authors,
    contributors,
    category,
    links,
    projectFile,
    image,
    topic,
    publishedDate: new Date(),
    personal,
  });

  try {
    const student = await Student.findOne({ _id: req.userId });
    if (!student) return res.status(404).send({ message: "No student found" });
    project.uploader = {
      name: student.name,
      mobile: student.mobile,
    };
    project.publisher = student.name;
    project.ownedBy.push(req.userId);

    // * Keywords
    project.keywords = await keyWordExtractorModel(description);

    // * Plagiarism

    const plagiarismResult = await plagiarismCheckModel(project);

    if (plagiarismResult?.isPlagiarized) {
      console.log("Plagiarized content ...");
      console.log(plagiarismResult);
      return res.status(405).send({
        message: "The content is found to be plagiarized.",
        cause: plagiarismResult.message,
        matchedWith: plagiarismResult.matchedWith,
      });
    }

    if (!project.personal) {
      const referral = student.referred;
      if (!referral)
        return res
          .status(404)
          .send({ message: "No referral code found in your account" });
      else {
        const projectrequest = new projectRequest({
          date: new Date(),
          data: project,
          referral: student.referred,
          senderName: student.name,
          senderMobile: student.mobile,
          senderId: req.userId,
        });

        await projectrequest.save();
      }
    }
    const data = await project.save();
    if (data)
      return res
        .status(200)
        .send({ message: "Project published", id: data._id });
    else return res.status(500).send({ message: "Try again after sometime" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server failure" });
  }
};

const keyWordExtractorModel = async (description) => {
  try {
    // * LLM MODEL FOR KEYWORDS EXTRACTION

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      document: `${description}`,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.KEYWORD_MODEL_URI}`,
      requestOptions
    );

    if (response.ok) {
      const keyWords = await response.text();
      return JSON.parse(keyWords?.trim());
    } else {
      return null;
    }
    // * LLM END
  } catch (error) {
    console.log("KEYWORDS MODEL ERROR: ", error);
    return null;
  }
};

const plagiarismCheckModel = async (project) => {
  try {
    const allProjects = await Project.find().select(
      "description links keywords"
    );

    // * uploader data.

    let selfProjectLinks = [];
    let selfKeywords = project.keywords;

    project.links.forEach((link) => {
      selfProjectLinks.push(link.source);
    });

    // *
    if (allProjects) {
      for (let i = 0; i < allProjects.length; i++) {
        const currentDocumentId = allProjects[i]._id;
        console.log(
          `[${i + 1}/${
            allProjects?.length
          }] Plagiarism scanning... ${currentDocumentId}`
        );
        let sourcesLinks = [];
        let sourcesKeywords = allProjects[i].keywords;
        allProjects[i].links.forEach((link) => {
          sourcesLinks.push(link.source);
        });

        // * checks

        // Convert the arrays to sets to perform set intersection
        const set1 = new Set(sourcesLinks);
        const set2 = new Set(selfProjectLinks);

        const set3 = new Set(sourcesKeywords);
        const set4 = new Set(selfKeywords);

        if (
          await similarityCheck(
            set1,
            set2,
            sourcesLinks?.length,
            selfProjectLinks?.length
          )
        ) {
          return {
            message: "Plagiarized Detected: Source links are same.",
            isPlagiarized: true,
            matchedWith: currentDocumentId,
          };
        }

        if (
          await similarityCheck(
            set3,
            set4,
            sourcesKeywords?.length,
            selfKeywords?.length
          )
        ) {
          return {
            message: "Plagiarized Detected: Keywords are same.",
            isPlagiarized: true,
            matchedWith: currentDocumentId,
          };
        }

        const plagiarismResult = await PlagiarismModelAPI(
          allProjects[i].description,
          project.description
        );

        if (plagiarismResult.is_plagiarism) {
          return {
            message: "Plagiarized Detected: Description are same.",
            isPlagiarized: true,
            matchedWith: currentDocumentId,
          };
        }
        // * reset
        sourcesLinks = [];
        sourcesKeywords = [];
      }
    } else {
      console.log("No projects are available");
    }
  } catch (error) {
    console.log("PLAGIARISM MODEL ERROR: ", error);
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().select("mobile name");
    if (!students) return res.status(404).send({ message: "No student found" });
    return res.status(200).send(students);
  } catch (error) {
    return res.status(500).send({ message: "Server failure" });
  }
};

const similarityCheck = async (set1, set2, array1L, array2L) => {
  const intersection = [...set1].filter((item) => set2.has(item));

  // Calculate the similarity as a percentage
  const similarity = (intersection.length / Math.min(array1L, array2L)) * 100;
  if (similarity >= 80) {
    return true;
  } else {
    return false;
  }
};

const PlagiarismModelAPI = async (data1, data2) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    sentence_1: `${data1}`,
    sentence_2: `${data2}`,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${process.env.PLAGIARISM_MODEL_URI}`,
      requestOptions
    );
    const resText = await response.text();
    const resData = JSON.parse(resText);
    return resData;
  } catch (error) {
    console.log("PLAGIARISM API MODULE ERROR ", error);
    return {
      is_plagiarism: false,
    };
  }
};
