const { Case, File, Tag, Route } = require("./Models");
const { getLastCaseId, getLastFileId, getLastTagId } = require("./query");

function createCase(caseObject) {
  return new Promise((resolve, reject) => {
    const lastId = getLastCaseId();
    const d3 = "c" + (lastId + 1);
    Case.query()
      .insert({
        case_name: caseObject.case_name,
        case_description: caseObject.case_description,
        case_d3: d3
      })
      .then(response => {
        console.log(response);
        resolve(response);
      });
  });
}

function createFile(fileObject) {
  return new Promise((resolve, reject) => {
    const lastId = getLastFileId();
    const d3 = "f" + (lastId + 1);
    File.query()
      .insert({
        file_name: fileObject.file_name,
        file_description: fileObject.file_description,
        file_d3: d3,
        case_id: fileObject.case_id,
        file_text: fileObject.file_text
      })
      .then(response => {
        console.log(response);
        resolve(resposne);
      });
  });
}

async function createTags(tagObjectArray) {
  // tagObjectArray should look like this:
  //   tagObjectArray = [
  //     {
  //       tag: "tag",
  //       file_id: 1,
  //       case_id: 2
  //     },
  //     {
  //       tag: "tag2",
  //       file_id: 1,
  //       case_id: 2
  //     }
  //   ];
  return new Promise((resolve, reject) => {
    tagArray.forEach(tag => {
      const lastId = getLastTagId();
      const d3 = "t" + (lastId + 1);
      Tag.query()
        .insert({
          tag: tag.tag,
          tag_d3: d3,
          case_id: tag.case_id,
          file_id: tag.file_id
        })
        .then(response => {
          console.log(response);
        });
    });
    resolve();
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
        resolve(resposne);
      });
  });
}

module.exports = {
  createTags,
  createFile,
  createCase,
  createRoute
};
