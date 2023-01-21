"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
// exports.signup =  (req, res) => __awaiter(void 0, void 0, void 0, async function* () {
//     let user;
//     const passwordSchema = new passwordValidator();
//     passwordSchema
//         .is().min(8, 'le mot de passe doit contenir 8 caractères minimum') // Minimum length 8
//         .is().max(100, 'le mot de passe doit contenir 100 caractères maximum') // Maximum length 100
//         .has().uppercase(1, 'le mot de passe doit contenir au moins une majuscule') // Must have uppercase letters
//         .has().lowercase(1, 'le mot de passe doit contenir au moins une minuscule') // Must have lowercase letters
//         .has().digits(2, 'le mot de passe doit contenir au moins deux chiffres') // Must have at least 2 digits
//         .has().not().spaces() // Should not have spaces
//         .is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse', '12345678', '123456789']); // Blacklist these values
//     if (!passwordSchema.validate(req.body.password)) {
//         return res.status(403).json(passwordSchema.validate(req.body.password, { details: true }));
//     }
//     else if (req.body.pseudo.length < 20) {
//         let saltRounds = parseInt(process.env.saltRounds);
//         await bcrypt.hash(req.body.password, saltRounds)
//         .then(hash => {
//             console.log(hash);
//             user = new User({
//                 pseudo: req.body.pseudo,
//                 password: hash,
//                 role: "",
//                 profileImageUrl: "",
//                 isConnected: false,
//                 peopleInvites: [],
//                 friends: [],
//             })
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
//                 .catch(() => res.status(400).json({ message: 'Utilisateur déjà existant !' }));            
//         })
//         .catch(error => console.error(error))
//     }
// });
exports.signup = async (req, res, next) => {
    const passwordSchema = new passwordValidator()
    passwordSchema
    .is().min(8, 'le mot de passe doit contenir 8 caractères minimum') // Minimum length 8
    .is().max(100, 'le mot de passe doit contenir 100 caractères maximum') // Maximum length 100
    .has().uppercase(1, 'le mot de passe doit contenir au moins une majuscule') // Must have uppercase letters
    .has().lowercase(1, 'le mot de passe doit contenir au moins une minuscule') // Must have lowercase letters
    .has().digits(2, 'le mot de passe doit contenir au moins deux chiffres') // Must have at least 2 digits
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse', '12345678', '123456789']) // Blacklist these values
    if(req.body.password !== "" && passwordSchema.validate(req.body.password)){
        await bcrypt.hash(req.body.password, parseInt(process.env.saltRounds)) //creates a hash for the password
        .then(hash => { //get the hash and put it in the user object
            const user = new User({
            pseudo: req.body.pseudo,
            profileImageUrl : "",
            role: "",
            isConnected : false,
            password: hash,
            peopleInvites: [],
            friends: [],
            })
            user.save() //update to DB
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error : "Utilisateur déjà existant"}))
        })
    } else {
        res.status(403).json(passwordSchema.validate(req.body.password, {details: true})) //returns where the password was unsafe
    }
}
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    User.findOne({ pseudo: req.body.pseudo })
        .then((user) => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
            if (!valid) {
                return res.status(403).json({ error: 'mot de passe incorrect !' });
            }
            let token = jwt.sign({ pseudo: user.pseudo }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({
                pseudo: req.body.pseudo,
                token: token,
            });
        });
    })
        .catch((error) => res.status(500).json({ error }));
});

exports.logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    User.findOne({pseudo: req.body.user})
    .then(user => {
        user.isConnected = false;
        User.updateOne({pseudo: req.body.user}, {isConnected: user.isConnected})
        .then(() => res.status(200).json({message: `${user.pseudo} déconnecté !`}))
        .catch(() => res.status(500).json({message: "Erreur Serveur. Nous n'avons pas pu vous déconnecter"}) );
    })
    .catch(() => res.status(500).json({message: "Erreur Serveur. Nous n'avons pas pu vous déconnecter"}) );
});
