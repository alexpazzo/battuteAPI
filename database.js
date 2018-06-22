'use strict';

const LokiJS = require('lokijs');

const DATABASE_PATH = 'database.json';

const db = new LokiJS(DATABASE_PATH);
const jokes = db.addCollection('jokes');

class Database {

}

module.exports = Database;