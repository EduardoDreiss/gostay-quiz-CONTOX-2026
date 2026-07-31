console.log("JS carregado");

import { perguntas } from "../../data/questions.js";
import { atualizarPontuacao } from "../services/pontuacaoService.js";

let indiceAtual = 0;
let acertos = 0;

const respostas = [];

const inicioQuiz = Date.now();

document.addEventListener("DOMContentLoaded", () => {
    mostrarPergunta();
});

function mostrarPergunta() {

    const pergunta = perguntas[indiceAtual];

    const container = document.getElementById("quizContainer");

    container.innerHTML = `

        <div class="quiz-card">

            <span class="contador">
                Pergunta ${indiceAtual + 1} de ${perguntas.length}
            </span>

            <h2 class="pergunta">
                ${pergunta.pergunta}
            </h2>

            <div class="alternativas">

                ${pergunta.alternativas
                    .map((alternativa, index) => `

                        <button
                            class="alternativa"
                            data-index="${index}"
                        >
                            ${alternativa}
                        </button>

                    `)
                    .join("")}

            </div>

        </div>

    `;

    document.querySelectorAll(".alternativa").forEach(botao => {
        botao.addEventListener("click", responder);
    });

}

function responder(evento) {

    const respostaEscolhida = Number(
        evento.target.dataset.index
    );

    const perguntaAtual = perguntas[indiceAtual];

    respostas.push({
        pergunta: perguntaAtual.id,
        resposta: respostaEscolhida,
        correta: perguntaAtual.correta
    });

    if (respostaEscolhida === perguntaAtual.correta) {
        acertos++;
    }

    indiceAtual++;

    if (indiceAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        finalizarQuiz();

    }

}

// async function finalizarQuiz() {

//     const fimQuiz = Date.now();

//     const tempoTotal = Math.floor(
//         (fimQuiz - inicioQuiz) / 1000
//     );

    
//     console.log(participante);


//     const resultado = {

//         totalQuestoes: perguntas.length,

//         acertos,

//         erros: perguntas.length - acertos,

//         tempo: tempoTotal,

//         respostas

//     };

//     console.log("Resultado:", resultado);

//     sessionStorage.setItem(
//         "resultadoQuiz",
//         JSON.stringify(resultado)
//     );

//     try {

//         const participante = JSON.parse(
//             sessionStorage.getItem("usuario")
//         );

//         console.log("Participante:", participante);
//         console.log("Resultado:", resultado);

        

//         const participanteAtualizado = await atualizarPontuacao(participante.id, resultado);

//         console.log("Participante atualizado:", participanteAtualizado);

//         sessionStorage.setItem(
//             "usuario",
//             JSON.stringify(participanteAtualizado)
//         );

//         // window.location.href = "resultado.html";

//     } catch (erro) {

//         console.error("Erro completo:", erro);
//         console.error("Código:", erro.code);
//         console.error("Mensagem:", erro.message);
//         console.error("Detalhes:", erro.details);
//         console.error("Hint:", erro.hint);

//         alert("Erro ao salvar a pontuação.");

//     }

// }

async function finalizarQuiz() {
    const fimQuiz = Date.now();

    const tempoTotal = Math.floor(
        (fimQuiz - inicioQuiz) / 1000
    );

    const resultado = {
        totalQuestoes: perguntas.length,
        acertos,
        erros: perguntas.length - acertos,
        tempo: tempoTotal,
        respostas
    };

    sessionStorage.setItem(
        "resultadoQuiz",
        JSON.stringify(resultado)
    );

    // Recupera o participante salvo
    const participante = JSON.parse(
        sessionStorage.getItem("usuario")
    );

    // Validação de segurança
    if (!participante || !participante.id) {
        console.error("Usuário não encontrado no sessionStorage ou sem ID.");
        alert("Erro: Dados do usuário não encontrados. Faça o cadastro novamente.");
        return;
    }

    try {
        const participanteAtualizado = await atualizarPontuacao(
            participante.id,
            resultado
        );

        console.log("Atualizado com sucesso:", participanteAtualizado);

        sessionStorage.setItem(
            "usuario",
            JSON.stringify(participanteAtualizado)
        );

        // Descomente quando quiser redirecionar
        window.location.href = "resultado.html";

    } catch (erro) {
        console.error("Erro ao atualizar pontuação no Supabase:", erro);
    }
}