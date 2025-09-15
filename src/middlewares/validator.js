import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const result = validationResult(req);


  //si el resultado no esta vacio hay errores
  if (!result.isEmpty()) {

//si hay errores devuelve los errores
    return res.json({ errors: result.mapped() });
  }
  
  next();
};