import express from "express";
import axios from "axios";
import moment from "moment";
import chalk from "chalk";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

const id = uuidv4().slice(0, 6);
const usuario = [];

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await axios.get("https://randomuser.me/api/");
    const { results } = usuarios.data;
    const name = results[0].name.first;
    const last = results[0].name.last;
    const genders = results[0].gender;
    const fecha = "MMMM Do YYYY, h:mm:ss a";
    const user = `<li>Nombre: ${name} - Apellido: ${last} - ${genders} - ID: ${id} - Timestamp: ${moment().format(
      fecha
    )}</li>`;

    usuario.push(user);

    let userSplit = _.partition(usuario, function (users) {
      return users.gender === "female";
    });

    res.send(userSplit);

    console.log(chalk.blue.bgWhite(userSplit));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
