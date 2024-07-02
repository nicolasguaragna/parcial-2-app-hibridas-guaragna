import "dotenv/config";
import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token.split(' ')[1], process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

export default verificarToken;
