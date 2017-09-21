function createCase(caseStuff, caseId) {
	const now = moment().format("YYYY-MM-DD HH:mm:ss");
	const caseinfo = `INSERT INTO Cases(case_id, case_name, case_description, date_modified)
  VALUES (${caseId}, "${caseStuff.caseName}", "${caseStuff.caseDescription}", '${now}')`;
	console.log(caseinfo);
	db.run(caseinfo, function(err) {
		if (err) {
			return console.error(err.message);
		}
		console.log(`Rows inserted ${this.changes}`);
	});
}

function createFile(fileStuff, fileId, caseId) {
	return new Promise((resolve, reject) => {
		const now = moment().format("YYYY-MM-DD HH:mm:ss");
		const fileInfo = `INSERT INTO Files(file_id, case_id, file_name, file_description, date_modified)
    VALUES (${fileId}, ${caseId}, "${fileStuff.fileName}", "${fileStuff.fileDescription}", '${now}')`;
		console.log(fileInfo);
		db.run(fileInfo, function(err) {
			if (err) {
				return console.error(err.message);
			}
			console.log(`Rows inserted ${this.changes}`);
			resolve("file added");
		});
	});
}

function createTags(tags, tagId, fileId, caseId) {
	const now = moment().format("YYYY-MM-DD HH:mm:ss");
	const tagArray = tags.split(", ");
	db.serialize(() => {
		tagArray.forEach(tag => {
			const tagging = `INSERT INTO Tags(tag_id, file_id, case_id, tag, date_modified) VALUES (${tagId}, ${fileId}, ${caseId}, '${tag}', '${now}');`;
			console.log(tagging);
			db.run(tagging);
			tagId += 1;
		});
	});
}
