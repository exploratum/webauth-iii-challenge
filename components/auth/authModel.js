const db = require('../../config/database/dbConfig');

function add(user) {
    return db('users').insert(user);
}

function findAll () {
    return db('users');
}

function findBy(filter) {
    console.log("Trying to find user in model")
    return db('users').where(filter).first();
}

module.exports = {
    add,
    findAll,
    findBy,
}