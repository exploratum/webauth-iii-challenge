const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const authModel = require('./authModel')

/****************************************************************************/
/*                              Get all Users                               */
/****************************************************************************/
router.get('/users', async (req, res) => {
    try {
        users = await authModel.findAll();
        res.status(200).json(users);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get record(s) from database"})
    }

});

/****************************************************************************/
/*                              Register a new  user                        */
/****************************************************************************/

router.post('/register', userInfoExist, async (req,res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        id = await authModel.add(user);
        res.status(201).json({message: `id of new user: ${id}`});
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding the record(s)"})
    }
})


/*********************************************************************************************************/
/*                                           MIDDLEWARE                                                  */
/******************************************************************************************************** */

/****************************************************************************/
/*                Check if username and password exist in body              */
/****************************************************************************/
async function userInfoExist(req, res, next) {
    const body = req.body
    if(body.username && body.password) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name and password are required"});
    }
}


module.exports = router;