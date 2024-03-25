import express from "express";
import axios from "axios";
import moment from "moment";
import chalk from "chalk";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

const usuario = [];

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await axios.get("https://randomuser.me/api/");
    const { results } = usuarios.data;
    const name = results[0].name.first;
    const last = results[0].name.last;
    const gender = results[0].gender;
    const id = uuidv4().slice(0, 6);
    const fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
    const user = `Nombre: ${name} - Apellido: ${last} - ${gender} - ID: ${id} - Timestamp: ${fecha}`;

    usuario.push({ name, last, gender, id, fecha });

    let userSplit = _.partition(usuario, (users) => users.gender === "male");

    const userGender = `
      <h2>Mujeres: </h2>
      <ol>
      ${userSplit[1].map((users) => {
        return `<li>Nombre: ${users.name} - Apellido: ${users.last} - ${users.gender} - ID: ${users.id} - Timestamp: ${users.fecha}</li>`;
      })}
      <ol/>
      
      <h2>Hombres: </h2>
      <ol>
      ${userSplit[0].map((users) => {
        return `<li>Nombre: ${users.name} - Apellido: ${users.last} - ${users.gender} - ID: ${users.id} - Timestamp: ${users.fecha}</li>`;
      })}
      <ol/>`;

    res.send(userGender);

    console.log(chalk.blue.bgWhite(user));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
