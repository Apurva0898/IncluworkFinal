// authController.js
import { createUser, loginUser } from '../services/authService.js';

export const signUp = (req, res) => {
    const data = req.body;

    createUser(data)
        .then(token => res.json(token))
        .catch(err => res.status(400).json(err));
};

export const login = (req, res, next) => {
    const { email, password } = req.body;

    loginUser(email, password)
        .then(token => res.json(token))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                next(err);
            }
        });
};