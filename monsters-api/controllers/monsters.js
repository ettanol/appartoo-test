"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/users');
const fs = require('fs');
exports.getMonsters = (req, res) => {
    User.find()
        .then((monsters) => res.status(200).json(monsters))
        .catch((error) => res.stauts(404).json(error));
};
exports.getUser = (req, res) => {
    User.findOne({ pseudo: req.params.pseudo })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json(error));
};
exports.invite = (req, res) => {
    User.findOne({ pseudo: req.body.receiver })
        .then((user) => {
        if(!user.peopleInvites.includes(req.body.sender) && !user.usersBlocked.includes(req.body.sender)) {
            user.peopleInvites.push(req.body.sender);
            User.updateOne({ pseudo: req.body.receiver }, {peopleInvites : user.peopleInvites})
            .then(()=> res.status(200).json({message: 'invite sent !'}))
            .catch(error => res.status(500).json(error));
        }})
        .catch((error) => res.status(500).json(error));
};
exports.accept = (req, res) => {
    // add new person to friends list and retrive him from the invites list
    User.findOne({ pseudo: req.body.receiver})
    .then((user) => {
        let index = user.peopleInvites.indexOf(req.body.sender);
        user.peopleInvites.splice(index, 1);
        user.friends.push(req.body.sender);
        User.updateOne({ pseudo: req.body.receiver}, {
            peopleInvites: user.peopleInvites,
            friends: user.friends,
        })
        .then(()=> console.log({message: 'invite accepted !'}))
        .catch(error => res.status(500).json({message : error}))
    })
    .catch(error => res.status(500).json(error));
    // both person are friends
    User.findOne({pseudo: req.body.sender})
    .then(user => {
        user.friends.push(req.body.receiver);
        User.updateOne({pseudo: req.body.sender}, {friends: user.friends})
        .then(()=> res.status(200).json({message: 'friend added !'}))
        .catch(error => res.status(500).json({message : error}))
    })
    .catch(error => res.status(500).json(error));
}

exports.decline = (req, res) => {
    // add new person to friends list and retrive him from the invites list
    User.findOne({ pseudo: req.body.receiver})
    .then((user) => {
        let index = user.peopleInvites.indexOf(req.body.sender);
        user.peopleInvites.splice(index, 1);
        User.updateOne({ pseudo: req.body.receiver}, {
            peopleInvites: user.peopleInvites,
        })
        .then(()=> res.status(200).json({message: 'invite  non accepted !'}))
        .catch(error => res.status(500).json({message : error}))
    })
    .catch(error => res.status(500).json(error));
}

exports.block = (req, res) => {
    User.findOne({ pseudo: req.body.receiver})
    .then((user) => {
        let index = user.peopleInvites.indexOf(req.body.sender);
        user.peopleInvites.splice(index, 1);
        user.usersBlocked.push(req.body.sender);
        User.updateOne({ pseudo: req.body.receiver}, {
            peopleInvites: user.peopleInvites,
            usersBlocked: user.usersBlocked,
        })
        .then(()=> res.status(200).json({message: `You've blocked ${req.body.sender}!`}))
        .catch(error => res.status(500).json({message : error}))
    })
    .catch(error => res.status(500).json(error));
}

exports.updateProfile = (req, res) => {
    User.findOne({ pseudo: req.params.user})
    .then(user => {
        if(req.file){
            if(user.profileImageUrl !== ''){
                const filename = user.profileImageUrl.split('/images/')[1]
                if (fs.existsSync(`images/${filename}`)){ //if the file already exists and a file is added in the request
                    fs.unlink(`images/${filename}`, err => {if(err) { throw err}}) //deletes the file from the server
                }
            }
        }
        let userObject = {
            role: req.body.role && req.body.role,
            profileImageUrl: req.file && `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        };
        User.updateOne({pseudo: req.params.user}, {...userObject})
        .then(() => res.status(200).json({message: 'Profil Modifié'}))
        .catch((error)=> console.error(error))
    })
    .catch(error => res.status(500).json(error))
}