const { Case, File, Tag, Route } = require("./Models");
const fs = require("fs");

//========================================= Get ALL From ... ===============
function getAllCases() {
  return new Promise((resolve, reject) => {
    Case.query().then(cases => {
      resolve(cases);
    });
  });
}

function getAllFilesFromCase(caseId) {
  return new Promise((resolve, reject) => {
    File.query()
      .where("case_id", "=", caseId)
      .then(files => {
        resolve(files);
      });
  });
}

function getAllTagsFromFile(fileId) {
  return new Promise((resolve, reject) => {
    Tag.query()
      .where("file_id", "=", filId)
      .then(tags => {
        resolve(tags);
      });
  });
}

function getAllTagsFromCase(caseId) {
  return new Promise((resolve, reject) => {
    Tag.query()
      .where("case_id", "=", caseId)
      .then(tags => {
        resolve(tags);
      });
  });
}

//===================================== Get Last CaseId, FileId, TagId

function getLastCaseId() {
  return Case.query()
    .select("case_id")
    .orderBy("case_id", "desc")
    .limit(1)
    .then(response => {
      console.log(response == true);
      if (response) {
        return response;
      } else {
        return false;
      }
    });
}

function getLastFileId() {
  return new Promise((resolve, reject) => {
    File.query()
      .select("file_id")
      .orderBy("file_id", "desc")
      .limit(1)
      .then(response => {
        resolve(response);
      });
  });
}

function getLastTagId() {
  return new Promise((resolve, reject) => {
    Tag.query()
      .select("tag_id")
      .orderBy("tag_id", "desc")
      .limit(1)
      .then(response => {
        resolve(response);
      });
  });
}

//============================================ Get Individual

function getCaseById(caseId) {
  return new Promise((resolve, reject) => {
    Case.query()
      .where("case_id", "=", caseId)
      .then(singleCase => {
        resolve(singleCase);
      });
  });
}

function getFileById(fileId) {
  return new Promise((resolve, reject) => {
    File.query()
      .where("file_id", "=", fileId)
      .then(file => {
        resolve(file);
      });
  });
}

function getTagById(tagId) {
  return new Promise((resolve, reject) => {
    Tag.query()
      .where("tag _id", "=", tagId)
      .then(tag => {
        resolve(tag);
      });
  });
}

// ============================================ Get Shared
// Going to have to mess around with this one once we actually get some data

function getFilesThatShareTag(caseId, tagger) {
  return File.query()
    .select(
      "Files.file_name",
      "Files.file_d3",
      "Files.file_description",
      "tag_d3",
      "Files.case_id",
      "tag"
    )
    .from("Tags")
    .join("Files")
    .groupBy("file_d3")
    .where("tag", "=", tagger)
    .andWhere("Files.case_id", "=", caseId)
    .then(response => {
      return response;
    });
}

function getAllTagsThatShareFile(fileId) {
  return Tag.query()
    .select(
      "Files.file_name",
      "Files.file_d3",
      "Files.file_description",
      "tag_d3",
      "Files.case_id",
      "tag"
    )
    .from("Files")
    .join("Tags")
    .where("Files.file_id", "=", fileId)
    .andWhere("Tags.file_id", "=", fileId)
    .then(response => {
      return response;
    });
}

async function test() {
  const result = await getAllTagsThatShareFile(3);
  console.log(result);
}

test();

// ============================================= Get Multiple

function getMultipleFiles(fileIdArray) {
  return new Promise((resolve, reject) => {});
}

// =================================== Delete File (once all tags are created and file data is stored!)

function deleteFile(location) {
  console.log("DELETING ", location, "!");
  fs.unlink(location, function(err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
}

module.exports = {
  getMultipleFiles,
  getFilesThatShareTag,
  getAllTagsThatShareFile,
  getTagById,
  getFileById,
  getCaseById,
  getLastTagId,
  getLastFileId,
  getLastCaseId,
  getAllTagsFromCase,
  getAllTagsFromFile,
  getAllFilesFromCase,
  getAllCases,
  deleteFile
};
