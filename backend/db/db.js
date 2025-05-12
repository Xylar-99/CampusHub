const sqlite3 = require('sqlite3')
const path = require('path');
const fs = require('fs')

const dbFile = path.join(__dirname , 'database.db'); 

const SQLquery = fs.readFileSync(path.join(__dirname , 'query.sql') , 'utf-8');

const db = new sqlite3.Database(dbFile);

function CreateTable()
{
    db.run(SQLquery);
}

CreateTable();


module.exports = {db , CreateTable};