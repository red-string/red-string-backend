const sqlite3 = require("sqlite3").verbose();

function createCase(caseObject) {
	const now = moment().format("YYYY-MM-DD HH:mm:ss");
	const caseSQL = `INSERT INTO Cases(case_name, case_description, date_modified)
  VALUES ("${caseObject.caseName}", "${caseObject.caseDescription}", '${now}')`;
	console.log(caseinfo);
	db.run(caseSQL, function(err) {
		if (err) {
			return console.error(err.message);
		}
		console.log(`Rows inserted ${this.changes}`);
	});
}

function createFile(fileObject, caseId) {
	return new Promise((resolve, reject) => {
		const now = moment().format("YYYY-MM-DD HH:mm:ss");
		const fileSQL = `INSERT INTO Files(case_id, file_name, file_description, date_modified)
    VALUES (${caseId}, "${fileObject.fileName}", "${fileObject.fileDescription}", '${now}')`;
		console.log(fileSQL);
		db.run(fileSQL, function(err) {
			if (err) {
				return console.error(err.message);
			}
			console.log(`Rows inserted ${this.changes}`);
			resolve("file added");
		});
	});
}

function createTags(tagString, fileId, caseId) {
	const now = moment().format("YYYY-MM-DD HH:mm:ss");
	const tagArray = tagString.split(", ");
	db.serialize(() => {
		tagArray.forEach(tag => {
			const tagSQL = `INSERT INTO Tags(file_id, case_id, tag, date_modified) VALUES (${fileId}, ${caseId}, '${tag}', '${now}');`;
			console.log(tagSQL);
			db.run(tagSQL);
		});
	});
}

module.exports = {
	createTags,
	createFile,
	createCase
};
