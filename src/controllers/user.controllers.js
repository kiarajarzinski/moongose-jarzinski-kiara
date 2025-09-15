import { UserModel } from "../models/user.model.js";

export const createUser = async (req,res) => {
    const { username, email, password} = req.body;

    try {
        const newUser = await UserModel.create({
            username,
            email,
            password
            });

            res.status(201).json({
                ok: true,
                msg: "Usuario creado exitósamente",
                data: newUser,
            });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
        
    }
};