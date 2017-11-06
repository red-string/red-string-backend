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
    .select("id")
    .orderBy("id", "desc")
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
      .select("id")
      .orderBy("id", "desc")
      .limit(1)
      .then(response => {
        resolve(response);
      });
  });
}

function getLastTagId() {
  return new Promise((resolve, reject) => {
    Tag.query()
      .select("id")
      .orderBy("id", "desc")
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
      .where("id", "=", caseId)
      .then(singleCase => {
        resolve(singleCase);
      });
  });
}

function getFileById(fileId) {
  return new Promise((resolve, reject) => {
    File.query()
      .where("id", "=", fileId)
      .then(file => {
        resolve(file);
      });
  });
}

function getTagById(tagId) {
  return Tag.query()
    .where("id", "=", tagId)
    .then(tag => {
      console.log(tag);
      return tag;
    });
}

// ============================================ Get Shared
// Going to have to mess around with this one once we actually get some data

function getFilesThatShareTag(caseId, tagger, tagId) {
  return Tag.query()
    .select("*")
    .from("Tags")
    .join("Files", "Files.id", "Tags.file_id")
    .where("Tags.tag", tagger)
    .andWhere("Tags.case_id", caseId)
    .groupBy("Tags.file_id")
    .then(response => {
      const sendRes = response.filter(res => res.tag_id !== tagId);
      return sendRes;
    });
}

function getAllTagsThatShareFile(fileId) {
  return Tag.query()
    .select(
      "Files.file_name",
      "Files.file_d3",
      "Files.file_description",
      "tag_d3",
      "Tag.id",
      "Tag.tag_frequency",
      "Files.id",
      "Files.case_id",
      "Tag.tag"
    )
    .from("Files")
    .join("Tags")
    .where("Files.id", "=", fileId)
    .then(response => {
      return response;
    });
}

// async function test() {
//   const result = await getFilesThatShareTag(1, "PA", 18);
//   console.log("Result in Test", result);
//   const withFreq = await getTagFrequencyFromFile(result);
//   console.log("With freq", withFreq);
// }

// test();

function getTagFrequencyFromFile(fileArray) {
  const len = fileArray.length;
  let counter = 0;
  return new Promise((resolve, reject) => {
    fileArray.forEach((fileObj, ind) => {
      Tag.query()
        .where("tag", fileObj.tag)
        .andWhere("file_id", fileObj.file_id)
        .then(result => {
          const correctTag = result.filter(tag => tag.tag_id == fileObj.tag_id);
          fileObj.freq = correctTag[0].tag_frequency;
          if (counter == len - 1) {
            resolve(fileArray);
          } else {
            counter++;
            return;
          }
        });
    });
  });
}

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
  getTagFrequencyFromFile,
  getAllCases,
  deleteFile
};
