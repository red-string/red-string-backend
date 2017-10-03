const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
	__dirname + "/db/redstring.db",
	sqlite3.OPEN_READWRITE,
	err => {
		if (err) {
			console.log("Uhoh");
			console.error(err.message);
		} else {
			console.log("Connected to redString Database.");
		}
	}
);

//========================================= Get ALL From ... ===============
function getAllCases() {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Cases`;
		db.all(sql, [], (err, row) => {
			if (err) console.log(err);
			resolve(row);
		});
	});
}

function getAllFilesFromCase(caseId) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Files WHERE case_id = ${caseId}`;
		db.all(sql, [], (err, row) => {
			if (err) console.log(err);
			resolve(row);
		});
	});
}

function getAllTagsFromFile(fileId) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Tags WHERE file_id = ${fileId}`;
		db.all(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
}

function getAllTagsFromCase(caseId) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Tags WHERE case_id = ${caseId}`;
		db.all(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
}

//===================================== Get Last CaseId, FileId, TagId

function getLastCaseId() {
	return new Promise((resolve, reject) => {
		const sql = `SELECT case_id FROM Cases ORDER BY case_id DESC LIMIT 1 `;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			resolve(row.case_id);
		});
	});
}

function getLastFileId() {
	return new Promise((resolve, reject) => {
		const sql = `SELECT file_id FROM Files ORDER BY file_id DESC LIMIT 1 `;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			resolve(row.file_id);
		});
	});
}

function getLastTagId() {
	return new Promise((resolve, reject) => {
		const sql = `SELECT tag_id FROM Tags ORDER BY tag_id DESC LIMIT 1 `;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row.tag_id);
		});
	});
}

//============================================ Get Individual

function getCaseById(caseId) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Cases WHERE case_id = ${caseId}`;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
}

function getFileById(fileId) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Files WHERE file_id = ${fileId}`;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
}

function getTagById(tagId) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM Tag WHERE tag_id = ${tagId}`;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
}

// ============================================ Get Shared

function getFilesThatShareTag(caseId, tag) {
	return new Promise((resolve, reject) => {
		const sql = `SELECT file_id FROM Tags WHERE case_id = ${caseId} AND tag = ${tag}`;
		db.get(sql, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
}

// ============================================= Get Multiple

function getMultipleFiles(fileIdArray) {
	return new Promise((resolve, reject) => {
		let sql = `SELECT * FROM Files WHERE `;
		fileIdArray.forEach(fileId => {
			sql += `file_id = ${fileId} OR `;
		});
		const finalIndex = sql.lastIndexOf("OR ");
		const searchSQL = sql.slice(finalIndex, 3);
		db.get(searchSQL, [], (err, row) => {
			if (err) console.log(err);
			console.log(row);
			resolve(row);
		});
	});
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
