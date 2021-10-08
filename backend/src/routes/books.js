const express = require('express')
const route = express.Router();
const jwt = require('jsonwebtoken')
const modelUsers = require('../models/Users')
const modelBooks = require('../models/Books')
const fs = require('fs')
const sequelize = require('sequelize')
const Op = sequelize.Op

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where: {
                    email: token.email,
                    name: token.name
                }
            }).then(user => {
                if(user.length != 0){
                    modelBooks.findAll({}).then(x => {
                        res.json(x)
                    })
                }
            })
        }
    })
})

route.post('/most-updated', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where: {
                    email: token.email,
                    name: token.name
                }
            }).then(user => {
                if(user.length != 0){
                    modelBooks.findAll({
                        order: sequelize.literal('title ASC')
                    }).then(x => {
                        res.json(x)
                    })
                }
            })
        }
    })
})

route.post('/most-liked', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where: {
                    email: token.email,
                    name: token.name
                }
            }).then(user => {
                if(user.length != 0){
                    modelBooks.findAll({
                        order: sequelize.literal('likes ASC')
                    }).then(x => {
                        res.json(x)
                    })
                }
            })
        }
    })
})

route.post('/search', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where:{
                    email: token.email
                }
            }).then(user => {
                if(user.length == 0){
                    res.json({ error: '[!] Users not found ' }).status(301)
                }else{
                    modelBooks.findAll({
                        where: {
                            title: { [Op.like]: `%${req.body.title}%` }
                        }
                    }).then(data => {
                        res.json(data)
                    })
                }
            })
        }
    })
})

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where: {
                    email: token.email,
                    name: token.name
                }
            }).then(user => {
                if(user.length == 0){
                    res.json({ error: '[!] Users not found!' }).status(301)
                }else{
                    req.files.buku.mv('public/books/' + req.files.buku.name, (err, buku) => {
                        if(err){
                            res.json({ error: '[!] failed uploading file' }).status(501)
                        }else{
                            req.files.cover.mv('public/books_cover/' + req.files.cover.name, (err, cover) => {
                                if(err){
                                    res.json({ error: '[!] failed uploading file' }).status(501)
                                }else{
                                    modelBooks.create({
                                        title: req.body.title,
                                        description: req.body.description,
                                        cover: req.headers.host + '/books_cover/' + req.files.cover.name,
                                        file: req.headers.host + '/books/' + req.files.buku.name,
                                        subscribe: true
                                    }).then((x) => {
                                        res.json({ success: 'Successfully uploading books' })
                                    }).catch(err => {
                                        console.log(err)
                                        res.json({ error: '[!] Something wrong in server' }).status(501)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where:{
                    email: token.email,
                    name: token.name
                }
            }).then((user) => {
                if(user.length != 0){
                    modelBooks.findAll({
                        where: {
                            title: req.body.title
                        }
                    }).then((data) => {
                        if(data.length != 0){
                            fs.unlink('./' + data[0].dataValues.file, (err, done) => {
                                if(err){
                                    res.json({ error: '[!] Error Deleting file' }).status(501)
                                }else{
                                    modelBooks.destroy({
                                        where: {
                                            title: req.body.title
                                        }
                                    }).then((result) => {
                                        res.json({ success: 'Successfully delete books' })
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

module.exports = route
