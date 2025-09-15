import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";

// Crear al usuario
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const newUser = await UserModel.create({ username, email, password });
    res.status(201).json({
      ok: true,
      msg: "Usuario creado exitosamente",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo crear al usuario",
    });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};

// Obtener todos los usuarios con sus tareas
export const getAllUsersWithTasks = async (req, res) => {
  try {
    const users = await UserModel.find();
    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        const tasks = await TaskModel.find({ assignedTo: user._id });
        return {
          user,
          tasks,
        };
      })
    );
    res.status(200).json(usersWithTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener usuarios con sus tareas" });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json({
      msg: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

// Eliminar usuario y sus tareas
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    await TaskModel.deleteMany({ assignedTo: user._id });
    res.status(200).json({ msg: "Usuario y sus tareas eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
};