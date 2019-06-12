const db = require('../../config/database/dbConfig');

function add(user) {
    return db('users').insert(user);
}

function findAll () {
    return db('users');
}

module.exports = {
    add,
    findAll,
}