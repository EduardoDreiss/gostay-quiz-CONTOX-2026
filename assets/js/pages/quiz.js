// kys
import { protegerQuiz } from "../guards/protegerQuiz.js";
import { perguntas as todasAsPerguntas } from "../../data/questions.js";
import { atualizarPontuacao } from "../services/pontuacaoService.js";

protegerQuiz();

console.log("JS carregado");

// Função para embaralhar e selecionar 10 perguntas aleatórias
function sortearPerguntas(lista, quantidade = 10) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, quantidade);
}

// Sorteia 10 perguntas do total de 50
const perguntas = sortearPerguntas(todasAsPerguntas, 10);

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

    // respostas.push({
    //     pergunta: perguntaAtual.id,
    //     resposta: respostaEscolhida,
    //     correta: perguntaAtual.correta
    // });

    respostas.push({

        id: perguntaAtual.id,
    
        pergunta: perguntaAtual.pergunta,
    
        alternativas: perguntaAtual.alternativas,
    
        respostaUsuario: respostaEscolhida,
    
        respostaCorreta: perguntaAtual.correta,
    
        acertou:
            respostaEscolhida === perguntaAtual.correta
    
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

        // Redireciona para a tela final
        window.location.href = "resultado.html";

    } catch (erro) {
        console.error("Erro ao atualizar pontuação no Supabase:", erro);
    }
}