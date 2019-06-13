const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const authModel = require('./authModel')

const generateToken = require('../../config/token/generateToken')

const secrets = require('../../config/token/secrets')

const jwt = require('jsonwebtoken')

/****************************************************************************/
/*                              Get all Users                               */
/****************************************************************************/
router.get('/users', validateCredentials, async (req, res) => {
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
    console.log('user: ', user);


    try {
        id = await authModel.add(user);
        const token = generateToken(user);
        res.status(201).json({message: `id of new user: ${id}`, token});
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding the record(s)"})
    }
})

/****************************************************************************/
/*                              user Login                                  */
/****************************************************************************/

router.post('/login', userCredentialsExist, async (req,res) => {
    let {username, password} = req.body;

    try {
        let user = await authModel.findBy({username});
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(201).json({message: `welcome ${user.username}`, token});
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem loggin in"})
    }
})


/*********************************************************************************************************/
/*                                           MIDDLEWARE                                                  */
/******************************************************************************************************** */

/****************************************************************************/
/*           Check if username, password and department exist in body       */
/****************************************************************************/
async function userInfoExist(req, res, next) {
    const body = req.body
    if(body.username && body.password && body.department) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name,password and department are required"});
    }
}

/****************************************************************************/
/*                      Check if credentials exist in body                  */
/****************************************************************************/
async function userCredentialsExist(req, res, next) {
    const body = req.body
    if(body.username && body.password) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name and password are required"});
    }
}

/****************************************************************************/
/*                          Validate Credentials                            */
/****************************************************************************/
async function validateCredentials(req,res,next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodeToken) =>  {
            if(err) {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
            else {
                req.user = { roles: decodeToken.roles, username: decodeToken.username };
                next();
            }
        })
    } 
    else {
        res.status(400).json({ message: 'No token provided' });
    }
}



module.exports = router;