import { request } from "express";
import { User } from "../models/users.js";
import bcrypt from "bcryptjs";

export async function cUser(req, res) {
  try {
    const data = req.body; //Obtenemos la informacion del Front y la guardamos
    let user;

    const salt = bcrypt.genSaltSync()
    data.password = bcrypt.hashSync(data.password, salt)// scriptar la contraseña 



    user = new User(data); //Asignamos el esquema con los datos nuevos

    await user.save(); //guardar en la DB
    console.log("User: " + user)

    res.status(200).json({
      msg: "User created succesfully",
      ok: true,
      user: user,
    })

  } catch (error) {

    console.error("Error en la creacion del servidor: " + error);

    return res.status(500).json({
      msg: "Error creating new user",
      ok: false
    })

  }
}

export async function gUser(req, res) {
  try {
    const users = await User.find()

    res.status(200).json({
      msg: "User getting succesfully",
      ok: true,
      users: users,
    })

  } catch (error) {
    console.error("Error en el get de usuario: " + error);

    return res.status(500).json({
      msg: "Error getting new user",
      ok: false
    })
  }
}

async function updateUserPassword() {
  let id = "6a976acec3fd8cbba198f986";

  const users = await User.find({
    _id: { $ne: id }
  })
  console.log(users);
  let newUsers = users.forEach((user) => {
    let salt = bcrypt.getSaltSync()
    user.password = bcrypt.hashSync(user.password, salt)
  })
}

export async function login(req, res) {
  try {

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: "Credenciales no validas - Correo",
        ok: false
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Credenciales no validas - Contraseña",
        ok: false
      })
    }

    res.status(200).json({
      msg: "Login exitoso",
      ok: true,
      user
    })

  } catch (error) {
    console.error("Error en el login: " + error);

    return res.status(500).json({
      msg: "Error login server",
      ok: false
    })
  }
}

export async function dUsers(req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      msg: "ID incorrecto ",
      ok: false
    })
  }

  await User.findByIdAndDelete(id)
  res.status(200).json({
    msg: "Usuario eliminado correctamente ",
    ok: true
  })
}

export async function changePassword(req, res) {
  try {
    const { email, currentPassword, newPassword } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        msg: "Credenciales no validas - contraseña",
        ok: false
      })
    }

    const validPassword = bcrypt.compareSync(currentPassword, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Credenciales no validas - Contraseña",
        ok: false
      })
    }

    const salt  = bcrypt.genSaltSync()
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt)

    await User.findByIdAndUpdate(user._id, {password: hashedNewPassword})
    res.status(200).json({
      msg: "¿Cambio contraseña exitoso",
      ok: true,
    })

  } catch (error) {
    console.error("Error en el cambio de contraseña: " + error);

    return res.status(500).json({
      msg: "Error  cambio contraseña",
      ok: false
    })
  }
}