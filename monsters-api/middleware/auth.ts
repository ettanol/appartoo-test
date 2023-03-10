const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = async (req: any, res: any, next: any) => {
        try {
            const token = req.headers.authorization
            const decodedToken = JWT.verify(token, process.env.JWT_SECRET) //verifies if the token is correct
            const userId = decodedToken.userId
            req.auth = { userId } //creates a params to verify the userId
            if (req.body.userId && req.body.userId !== userId) {
            res.status(403).json({error: new Error("Email utilisateur invalide")})
            } else {
            next()
            }
        } catch {
            res.status(401).json({ error: new Error('something went wrong') })
        }
}