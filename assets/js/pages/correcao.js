// import { protegerCorrecoes } from "../guards/protegerCorrecoes.js";

// protegerCorrecoes();

console.log("Correções carregadas.");

const resultado = JSON.parse(
    sessionStorage.getItem("resultadoQuiz")
);

if (!resultado) {

    window.location.href = "/index.html";

}

const container = document.getElementById(
    "correcoesContainer"
);

resultado.respostas.forEach((item, index) => {

    const acertou = item.acertou;

    container.innerHTML += `

        <div class="card-correcao">

            <h2>

                ${index + 1}. ${item.pergunta}

            </h2>

            <p>

                <strong>Sua resposta:</strong>

                ${item.alternativas[item.respostaUsuario]}

            </p>

            <p>

                <strong>Resposta correta:</strong>

                ${item.alternativas[item.respostaCorreta]}

            </p>

            <p class="${
                acertou ? "acertou" : "errou"
            }">

                ${
                    acertou
                    ? "✅ Você acertou esta questão."
                    : "❌ Você errou esta questão."
                }

            </p>

        </div>

    `;

});