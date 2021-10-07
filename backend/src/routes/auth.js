const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const model = require('../models/Users')
const role = require('../models/Role')

route.post('/profile', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }

        model.findAll({
            where: {
                name: token.name
            }
        }).then(data => {
            res.json(data)
        })
    })
})

route.post('/register', (req,res) => {
    model.findAll({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    }).then(email => {
        if(email.length == 0){
            bcrypt.hash(req.body.password, 10, (err, pw) => {
                model.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: pw,
                    role: req.body.role
                })

                res.json({ done: 'done' })
            })
        }else{
            res.json({ error: '[!] Users already registered' }).status(301)
        }
    })
})

route.post('/login', (req,res) => {
    model.findAll({
        where: {
            email: req.body.email
        }
    }).then(data => {
        bcrypt.compare(req.body.password, data[0].dataValues.password, (err, done) => {
            if(done){
                const token = jwt.sign(data[0].dataValues, process.env.SECRET)
                res.header('Token', token)
                res.json({ success: 'Login success' })
            }else{
                res.json({ error: '[!] Username / Password is wrong' }).status(301)
            }
        })
    }).catch(e => {
        res.json({ wrong: '[!] Username / Password is wrong' }).status(301)
    })
});

module.exports = route;
