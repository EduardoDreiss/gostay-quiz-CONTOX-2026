// import { buscarRankingCompletoHoje } from "../services/pontuacaoService.js";

// document.addEventListener("DOMContentLoaded", async () => {

//     const container = document.getElementById("ranking");

//     try {

//         const ranking = await buscarRankingCompletoHoje();

//         container.innerHTML = ranking.map((participante, index) => `

//             <div class="linha-ranking">

//                 <span>${index + 1}º</span>

//                 <span>${participante.nome}</span>

//                 <span>${participante.acertos} acertos</span>

//                 <span>${participante.tempo_total}s</span>

//             </div>

//         `).join("");

//     } catch (erro) {

//         console.error(erro);

//         container.innerHTML = "<p>Erro ao carregar o ranking.</p>";

//     }

// });7


import { buscarRankingCompletoHoje } from "../services/pontuacaoService.js";

document.addEventListener("DOMContentLoaded", carregarRanking);

async function carregarRanking() {

    const container = document.getElementById("ranking");

    try {

        const ranking = await buscarRankingCompletoHoje();

        if (!ranking || ranking.length === 0) {

            container.innerHTML = `
                <div class="hero">
                    <h2>Nenhum participante encontrado.</h2>
                    <p class="descricao">
                        Ainda não existem resultados para hoje.
                    </p>
                </div>
            `;

            return;
        }

        const podio = ranking.slice(0, 3);
        const restantes = ranking.slice(3);

        container.innerHTML = `

            <div class="podio">

                ${podio.map((participante, index) => `

                    <div class="podio-card ${index === 0 ? "primeiro" : ""}">

                        <div class="posicao">
                            ${
                                index === 0
                                    ? "🥇"
                                    : index === 1
                                    ? "🥈"
                                    : "🥉"
                            }
                        </div>

                        <div class="nome">
                            ${participante.nome}
                        </div>

                        <div class="acertos">
                            ${participante.acertos} acertos
                        </div>

                        <div class="tempo">
                            ${participante.tempo_total}s
                        </div>

                    </div>

                `).join("")}

            </div>

            <div class="lista-ranking">

                ${restantes.map((participante, index) => `

                    <div class="card-ranking">

                        <div class="col">

                            <div class="posicao-lista">
                                ${index + 4}
                            </div>

                            <div>

                                <div class="nome-lista">
                                    ${participante.nome}
                                </div>

                                <div class="info">
                                    ${participante.acertos} acertos • ${participante.tempo_total}s
                                </div>

                            </div>

                        </div>

                    </div>

                `).join("")}

            </div>

        `;

    } catch (erro) {

        console.error("Erro ao carregar ranking:", erro);

        container.innerHTML = `
            <div class="hero">
                <h2>Erro ao carregar o ranking.</h2>
                <p class="descricao">
                    Tente novamente em alguns instantes.
                </p>
            </div>
        `;

    }

}