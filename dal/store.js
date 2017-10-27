const { Case, File, Tag, Route } = require("./Models");
const { getLastCaseId, getLastFileId, getLastTagId } = require("./query");

async function createCase(caseObject) {
  const lastId = await getLastCaseId();
  console.log("This is the lastId variable = ", lastId.length);
  let d3;
  if (lastId.length !== 0) {
    d3 = "c" + (lastId[0].case_id + 1);
  } else {
    d3 = "c1";
  }

  return Case.query()
    .insert({
      case_name: caseObject.case_name,
      case_description: caseObject.case_description,
      case_d3: d3
    })
    .then(response => {
      console.log(response);
      return response;
    });
}

async function createFile(fileObject) {
  const lastId = await getLastFileId();
  let d3;
  console.log(lastId);
  if (lastId.length !== 0) {
    d3 = "f" + (lastId[0].file_id + 1);
  } else {
    d3 = "f1";
  }
  return File.query()
    .insert({
      file_name: fileObject.file_name,
      file_description: fileObject.file_description,
      file_d3: d3,
      case_id: fileObject.case_id,
      file_text: fileObject.file_text
    })
    .then(response => {
      console.log("this is file being saved", response);
      return response;
    });
}

async function createTags(tagObjectArray, fileId, caseId) {
  const lastId = await getLastTagId();
  let startNum;
  console.log(lastId);
  if (lastId.length !== 0) {
    startNum = lastId[0].tag_id + 1;
  } else {
    startNum = 0;
  }
  return tagObjectArray.forEach(tag => {
    startNum++;
    Tag.query()
      .insert({
        tag: tag.tag,
        tag_d3: "t" + startNum,
        case_id: caseId,
        file_id: fileId,
        tag_frequency: tag.frequency
      })
      .then(response => {
        return response;
      });
  });
}

function createRoute(routeObject) {
  return new Promise((resolve, reject) => {
    Route.query()
      .insert({
        case_id: routeObject.file_name,
        route: routeObject.route,
        route_name: routeObject.route_name,
        route_description: routeObject.file_description
      })
      .then(response => {
        console.log(response);
        resolve(response);
      });
  });
}

module.exports = {
  createTags,
  createFile,
  createCase,
  createRoute
};
