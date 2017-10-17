const { Case, File, Tag, Route } = require("./Models");

//========================================= Get ALL From ... ===============
function getAllCases() {
  return new Promise((resolve, reject) => {});
}

function getAllFilesFromCase(caseId) {
  return new Promise((resolve, reject) => {});
}

function getAllTagsFromFile(fileId) {
  return new Promise((resolve, reject) => {});
}

function getAllTagsFromCase(caseId) {
  return new Promise((resolve, reject) => {});
}

//===================================== Get Last CaseId, FileId, TagId

function getLastCaseId() {
  return new Promise((resolve, reject) => {
    Case.query()
      .select("case_id")
      .orderBy("case_id", "desc")
      .limit(1)
      .then(resposne => {
        resolve(respone);
      });
  });
}

function getLastFileId() {
  return new Promise((resolve, reject) => {
    File.query()
      .select("case_id")
      .orderBy("case_id", "desc")
      .limit(1)
      .then(resposne => {
        resolve(respone);
      });
  });
}

function getLastTagId() {
  return new Promise((resolve, reject) => {
    Tag.query()
      .select("case_id")
      .orderBy("case_id", "desc")
      .limit(1)
      .then(resposne => {
        resolve(respone);
      });
  });
}

//============================================ Get Individual

function getCaseById(caseId) {
  return new Promise((resolve, reject) => {});
}

function getFileById(fileId) {
  return new Promise((resolve, reject) => {});
}

function getTagById(tagId) {
  return new Promise((resolve, reject) => {});
}

// ============================================ Get Shared

function getFilesThatShareTag(caseId, tag) {
  return new Promise((resolve, reject) => {});
}

// ============================================= Get Multiple

function getMultipleFiles(fileIdArray) {
  return new Promise((resolve, reject) => {});
}

module.exports = {
  getMultipleFiles,
  getFilesThatShareTag,
  getTagById,
  getFileById,
  getCaseById,
  getLastTagId,
  getLastFileId,
  getLastCaseId,
  getAllTagsFromCase,
  getAllTagsFromFile,
  getAllFilesFromCase,
  getAllCases
};
