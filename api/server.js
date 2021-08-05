// BUILD YOUR SERVER HERE
const express = require("express")
const User = require('./users/model')
// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS

// [GET]
server.get('/api/users', (req, res)=>{
    User.find()
        .then(users =>{
            res.status(200).json(users)
        })
        .catch(err =>{
            res.status(500).json({message: "The users information could not be retrieved"})
        })
})
// [GET] by :id
server.get('/api/users/:id', (req, res)=>{
    const { id } = req.params

    User.findById(id)
        .then(users => {
            if (!users) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
            else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved"})
        })
})
// [POST]
server.post('/api/users', (req, res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    else {
        User.insert(newUser)
            .then(user => {
            res.status(201).json(user)
        })
            .catch(err => {
            res.status(500).json({message: "There was an error while saving the user to the database"})
        })
    }
})

// [PUT]
server.put('/api/users/:id', (req, res)=>{
    const { id } = req.params
    const changes = req.body
    User.update(id, changes)
        .then(updatedUser =>{
            if (!updatedUser) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else{
                if (!changes.name || !changes.bio){
                    res.status(400).json({message: "Please provide name and bio for the user"})
                }
                else {
                    res.status(200).json(updatedUser)
                }
            }
        })
        .catch(err =>{
            res.status(500).json({ message: "The user information could not be modified" })
        })
})

// [DELETE]
server.delete('/api/users/:id', (req, res) =>{
    const { id } = req.params

    User.remove(id)
        .then(deleted =>{
            if (!deleted) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else {
                res.json(deleted)
            }
        })
        .catch(err =>{
            res.status(500).json({ message: "The user information could not be modified" })
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
