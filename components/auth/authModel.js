const db = require('../../config/database/dbConfig');

function add(user) {
    return db('users').insert(user);
}

function findAllIn (department) {
    return db('users').where(department);
}

function findBy(filter) {
    return db('users').where(filter).first();
}

module.exports = {
    add,
    findAllIn,
    findBy,
}