// kys 

import {
    buscarUsuarioPorToken,
    validarEmail
} from "../services/usuarioService.js";

import { salvarUsuario } from "../services/authService.js";

document.addEventListener("DOMContentLoaded", validarLogin);

async function validarLogin() {

    try {

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if (!token) {

            window.location.href = "index.html";

            return;

        }

        const usuario = await buscarUsuarioPorToken(token);

        if (!usuario) {

            alert("Link inválido.");

            window.location.href = "index.html";

            return;

        }

        const usuarioAtualizado = await validarEmail(usuario.id);

        salvarUsuario(usuarioAtualizado);

        window.location.href = "instruçõesQuiz.html";

    } catch (erro) {

        console.error(erro);

        alert("Este link é inválido ou já foi utilizado.");

        window.location.href = "index.html";

    }

}