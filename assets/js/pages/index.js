import {
    criarUsuario,
    buscarParticipanteHoje
} from "../services/usuarioService.js";

import { salvarUsuario } from "../services/authService.js";

console.log("JS carregado");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("cadastroForm");

    if (!form) {
        console.error("Formulário cadastroForm não encontrado.");
        return;
    }

    form.addEventListener("submit", handleSubmit);

});

async function handleSubmit(event) {

    event.preventDefault();

    const nome = limpezaNome(
        document.getElementById("nome").value
    );

    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const telefone = limpezaTelefone(
        document.getElementById("telefone").value
    );

    if (!validarFormulario(nome, email, telefone)) {
        return;
    }

    const usuario = {
        nome,
        email,
        telefone
    };

    console.log("Usuário:", usuario);

    try {

        // Verifica se o participante já respondeu hoje
        const participanteExistente =
            await buscarParticipanteHoje(email, telefone);

        if (participanteExistente) {

            console.log("Participante já respondeu hoje.");

            salvarUsuario(participanteExistente);

            window.location.href = "resultado.html";

            return;
        }

        // Cria novo participante
        const usuarioCriado = await criarUsuario(usuario);

        console.log("Participante criado:", usuarioCriado);

        // Salva o usuário para as próximas páginas
        salvarUsuario(usuarioCriado);

        // Vai diretamente para as instruções
        window.location.href = "instruçõesQuiz.html";

    } catch (erro) {

        console.error("Erro ao cadastrar participante:", erro);

        alert(
            "Não foi possível realizar o cadastro. " +
            "Tente novamente."
        );

    }

}

function validarEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

function validarFormulario(nome, email, telefone) {

    const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regexNome.test(nome)) {

        alert("O nome possui caracteres inválidos.");

        return false;
    }

    if (nome.length < 3 || nome.length > 80) {

        alert(
            "O nome deve conter entre 3 e 80 caracteres."
        );

        return false;
    }

    if (!validarEmail(email)) {

        alert("Informe um e-mail válido.");

        return false;
    }

    if (email.length > 100) {

        alert("E-mail muito grande.");

        return false;
    }

    if (telefone.length < 8 || telefone.length > 13) {

        alert("Informe um telefone válido.");

        return false;
    }

    return true;

}

function limpezaNome(nome) {

    return nome
        .trim()
        .replace(/\s+/g, " ");

}

function limpezaTelefone(telefone) {

    return telefone.replace(/\D/g, "");

}