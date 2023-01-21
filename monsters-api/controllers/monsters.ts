const User = require('../models/users');
import { User } from "../interfaces/user";

exports.getMonsters = (req: any, res: any) => {
    User.find()
    .then((monsters: any) => res.status(200).json(monsters))
    .catch((error: any) => res.stauts(404).json(error));
}

exports.getUser = (req: any, res:any) => {
    User.findOne({pseudo: req.params.pseudo})
    .then((user: User) => res.status(200).json(user))
    .catch((error: any) => res.status(500).json(error))
}

exports.invite = (req: any, res: any) => {
    User.findOne({receiver: req.body.receiver})
    .then((user: User) => {
        user.peopleInvited.push(req.body.sender);
        User.save();
    })
    .catch((error: any) => res.status(500).json(error))
}
