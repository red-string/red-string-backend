const {
  getMultipleFiles,
  getAllTagsThatShareFile,
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
  getAllCases,
  deleteFile,
  getTagFrequencyFromFile
} = require("./query");

const { createTags, createFile, createCase, createRoute } = require("./store");

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
  createTags,
  createFile,
  createCase,
  createRoute,
  deleteFile,
  getTagFrequencyFromFile
};
