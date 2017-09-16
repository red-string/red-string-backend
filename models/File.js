//This is the Schema for File and Case data ===============================
const mongoose = require("mongoose");
const moment = require("moment");

const CaseSchema = new mongoose.Schema({
	caseName: { type: String },
	caseType: { type: String },
	caseLocation: { type: String },
	savedStrings: [{ string: { type: String } }],
	dateCreated: { type: Date, default: moment.now() },
	dateModified: { type: Date },
	files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
});

const FileSchema = new mongoose.Schema({
	fileName: { type: String },
	fileType: { type: String },
	fileLocation: { type: String },
	textContent: { type: String },
	tags: [{ tag: { type: String } }],
	dates: [{ date: { type: Date } }],
	dateCreated: { type: Date, default: moment.now() },
	dateModified: { type: Date },
	caseNo: { type: mongoose.Schema.Types.ObjectId, ref: "Case" }
});

const Case = mongoose.model("Case", CaseSchema);
const File = mongoose.model("File", FileSchema);

module.exports = { Case, File };
