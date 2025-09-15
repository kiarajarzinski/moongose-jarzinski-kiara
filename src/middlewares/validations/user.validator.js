import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 carácteres")
    .custom(async (value) => {

      const user = await UserModel.findOne({ username: value });

      if (user) {
        throw new Error("El  nombre de usuario está en uso");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("EL email debe ser válido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
];

export const updateUserValidator = [
  body("username")
    .optional() 
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({ username: value });
      //comparamos que el id del usuario encontrado no sea igual al id del usuario que esta siendo actualizado
      if (user && user._id.toString() !== req.params.id) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe ser válido")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({ email: value });
      if (user && user._id.toString() !== req.params.id) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 carácteres"),
];