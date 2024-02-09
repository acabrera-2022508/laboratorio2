"use strict";

import userModel from "./user.model.js";
import { encrypt, comparePassword, checkUpdate } from "../utils/validator.js";

export const test = async (req, res) => {
  let allUsers = await userModel.find({});

  res.send(allUsers);
};

// only for client
export const register = async (req, res) => {
  try {
    let data = req.body;

    data.password = await encrypt(data.password);
    data.role = "CLIENT";

    let user = new userModel(data);

    await user.save();

    return res.send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error registering user", error });
  }
};

export const update = async (req, res) => {
  try {
    //obtener el ide del usuario a actualizar
    let { id } = req.params;
    //Obtener datos que vamos a actualizar
    let data = req.body;
    //Validar si trae datos a actualizar
    let update = checkUpdate(data, id);
    if (!update)
      return res
        .status(400)
        .send({
          message:
            "Have submitted some data that cannot be updated or missing data",
        });
    //Validar si tiene permisos (tokenizacion) X hoy no lo vemos X
    //Actualizamos en la BD
    let updateUser = await userModel.findOneAndUpdate(
      { _id: id }, //ObjetcId <- hexadecimal (Hora sys, version mongo, llave privada)
      data, //Datos a actualizar
      { new: true }
    );
    //Validar si se actualizo
    if (!updateUser)
      return res.status(400).send({ message: "User not found and not update" });
    //Responder con el dato actualizo
    return res.send({ message: "Update user", updateUser });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error updating account" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = await userModel.findOneAndDelete({ _id: req.params.id });

    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting user", error });
  }
};

export const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    let isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    return res.send({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error logging in user", error });
  }
};
