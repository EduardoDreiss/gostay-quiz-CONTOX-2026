//
// import { protegerResultado } from "../guards/protegerResultado.js";

// protegerResultado();

document.addEventListener("DOMContentLoaded", () => {

    console.log("resultado.html");

    const participanteAtual = JSON.parse(
        sessionStorage.getItem("usuario")
    );

    console.log(participanteAtual);

    if (!participanteAtual) {
        window.location.href = "index.html";
        return;
    }

    const container =
        document.getElementById("tituloResultado");

    container.innerHTML = `
        <h1>Olá ${participanteAtual.nome}!</h1>
        <p> sua pontuação final foi de ${participanteAtual.acertos} acertos em ${participanteAtual.tempo_total} segundos !!</p>

        <h2>caso queira comparar suas respostas, clique aqui</h2>
    `;

});