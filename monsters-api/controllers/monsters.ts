const User = require('../models/users');
import { User } from "../interfaces/user";

exports.getMonsters = (req: any, res: any) => {
    User.find()
    .then((monsters: any) => res.status(200).json({monsters}))
    .catch((error: any) => res.stauts(404).json({error}));
}