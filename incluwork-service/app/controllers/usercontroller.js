import { fetchAllUsers } from "../services/userService";

export const getAllUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users", error: err });
    }
};