/*jshint esversion: 6 */
const sqlite3 = require('sqlite3');
const fs = require('fs');

fs.appendFile('database.db', '', (err) => {
    if(err) return console.log("Could not create database file.");
});

let db = new sqlite3.Database('database.db', (err) => {
    if(err)
        return console.error(err.message);
    
    console.log('Connected to the database on file database.db');
});

function setupGameTable() {
    const sql = `CREATE TABLE IF NOT EXISTS games (
        gid INTEGER,
        name TEXT
    )`;
    return db.run(sql);
}

function setupDataTable() {
    const sql = `CREATE TABLE IF NOT EXISTS data(
        uid INTEGER,
        sid INTEGER,
        gid INTEGER,
        timePlayed BIGINT
    )`
    return db.run(sql);
}

setupGameTable();
setupDataTable();

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });