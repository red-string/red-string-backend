const sqlite3 = require("sqlite3");
const Promise = require("bluebird");
const objection = require("objection");
const Model = objection.Model;
const Knex = require("knex");

const knex = Knex({
  client: "sqlite3",
  connection: {
    filename: __dirname + "/db/redstring.db"
  }
});

Model.knex(knex);

const schemaCases = knex.schema.createTableIfNotExists("Cases", table => {
  table.increments("case_id").primary();
  table.string("case_name");
  table.string("case_description");
  table.string("case_d3");
  table.timestamp("date_created").defaultTo(knex.fn.now());
  table.dateTime("date_modified");
});

const schemaFiles = knex.schema.createTableIfNotExists("Files", table => {
  table.increments("file_id").primary();
  table
    .integer("case_id")
    .references("case_id")
    .inTable("Cases");
  table.string("file_name");
  table.string("file_description");
  table.text("file_text");
  table.string("file_d3");
  table.timestamp("date_created").defaultTo(knex.fn.now());
  table.dateTime("date_modified");
});

const schemaTags = knex.schema.createTableIfNotExists("Tags", table => {
  table.increments("tag_id").primary();
  table
    .integer("file_id")
    .references("file_id")
    .inTable("Files");
  table
    .integer("case_id")
    .references("case_id")
    .inTable("Cases");
  table.string("tag_d3");
  table.string("tag");
  table.timestamp("date_created").defaultTo(knex.fn.now());
  table.dateTime("date_modified");
});

const schemaRoutes = knex.schema.createTableIfNotExists("Routes", table => {
  table.increments("route_id").primary();
  table
    .integer("case_id ")
    .references("case_id")
    .inTable("Cases");
  table.text("route");
  table.text("route_name");
  table.text("route_description");
  table.timestamp("date_created").defaultTo(knex.fn.now());
  table.dateTime("date_modified");
});

schemaCases.then();
schemaFiles.then();
schemaTags.then();
schemaRoutes.then();

// Author model.
class Case extends Model {
  static get tableName() {
    return "Cases";
  }
  static get relationMappings() {
    return {
      caseFiles: {
        relation: Model.HasManyRelation,
        modelClass: Files,
        join: {
          from: Case.case_id,
          to: File.file_id
        }
      }
    };
  }
}

class File extends Model {
  static get tableName() {
    return "Files";
  }
  static relationMappings() {
    return {
      fileTags: {
        relation: Model.HasManyRelation,
        modelClass: Tag,
        join: {
          from: File.file_id,
          to: Tag.file_id
        }
      }
    };
  }
}

class Tag extends Model {
  static get tableName() {
    return "Tags";
  }
  static relationMappings() {
    return {
      tagFile: {
        relation: Model.BelongsToOneRelation,
        modelClass: File,
        join: {
          from: Tag.file_id,
          to: File.file_id
        }
      },
      tagCase: {
        relation: Model.BelongsToOneRelation,
        modelClass: Case,
        join: {
          from: Tag.case_id,
          to: Case.case_id
        }
      }
    };
  }
}

class Route extends Model {
  static get tableName() {
    return "Routes";
  }
}

module.exports = {
  Case,
  File,
  Tag,
  Route
};
