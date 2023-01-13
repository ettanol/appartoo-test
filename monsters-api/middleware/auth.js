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
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET); //verifies if the token is correct
        const userId = decodedToken.userId;
        req.auth = { userId }; //creates a params to verify the userId
        if (req.body.userId && req.body.userId !== userId) {
            res.status(403).json({ error: new Error("Email utilisateur invalide") });
        }
        else {
            next();
        }
    }
    catch (_a) {
        res.status(401).json({ error: new Error('something went wrong') });
    }
});
