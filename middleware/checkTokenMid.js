import jwt from 'jsonwebtoken';

export function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and has Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 0, msg: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify and decode the token using your secret key
        const decoded = jwt.verify(token, process.env.TOKENKEY);
        if (decoded) {
            req.body.id = decoded.id
            next()
        }
        else {
            res.send({
                status: 0,
                msg: 'Invalid Token'
            })
        }

    } catch (err) {
        return res.status(403).json({ status: 0, msg: 'Unauthorized: Invalid or expired token' });
    }
}
