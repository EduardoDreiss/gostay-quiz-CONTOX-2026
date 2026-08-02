// // kys

// import { buscarRankingCompletoHoje } from "../services/pontuacaoService.js";

// document.addEventListener("DOMContentLoaded", carregarRanking);

// async function carregarRanking() {

//     const container = document.getElementById("ranking");

//     try {

//         const ranking = await buscarRankingCompletoHoje();

//         if (!ranking || ranking.length === 0) {

//             container.innerHTML = `
//                 <div class="hero">
//                     <h2>Nenhum participante encontrado.</h2>
//                     <p class="descricao">
//                         Ainda não existem resultados para hoje.
//                     </p>
//                 </div>
//             `;

//             return;
//         }

//         const podio = ranking.slice(0, 3);
//         const restantes = ranking.slice(3);

//         container.innerHTML = `

//             <div class="podio">

//                 ${podio.map((participante, index) => `

//                     <div class="podio-card ${index === 0 ? "primeiro" : ""}">

//                         <div class="posicao">
//                             ${
//                                 index === 0
//                                     ? "🥇"
//                                     : index === 1
//                                     ? "🥈"
//                                     : "🥉"
//                             }
//                         </div>

//                         <div class="nome">
//                             ${participante.nome}
//                         </div>

//                         <div class="acertos">
//                             ${participante.acertos} acertos
//                         </div>

//                         <div class="tempo">
//                             ${participante.tempo_total}s
//                         </div>

//                     </div>

//                 `).join("")}

//             </div>

//             <div class="lista-ranking">

//                 ${restantes.map((participante, index) => `

//                     <div class="card-ranking">

//                         <div class="col">

//                             <div class="posicao-lista">
//                                 ${index + 4}
//                             </div>

//                             <div>

//                                 <div class="nome-lista">
//                                     ${participante.nome}
//                                 </div>

//                                 <div class="info">
//                                     ${participante.acertos} acertos • ${participante.tempo_total}s
//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                 `).join("")}

//             </div>

//         `;

//     } catch (erro) {

//         console.error("Erro ao carregar ranking:", erro);

//         container.innerHTML = `
//             <div class="hero">
//                 <h2>Erro ao carregar o ranking.</h2>
//                 <p class="descricao">
//                     Tente novamente em alguns instantes.
//                 </p>
//             </div>
//         `;

//     }

// }

import { buscarRankingCompletoHoje } from "../services/pontuacaoService.js";

document.addEventListener("DOMContentLoaded", carregarRanking);

async function carregarRanking() {

    const container = document.getElementById("ranking");

    try {

        const ranking = await buscarRankingCompletoHoje();

        const usuarioAtual = JSON.parse(
            sessionStorage.getItem("usuario")
        );

        if (!ranking || ranking.length === 0) {

            container.innerHTML = `
                <div class="hero">
                    <h2>Nenhum participante encontrado.</h2>
                </div>
            `;

            return;
        }

        const minhaPosicao = ranking.findIndex(
            participante => participante.id === usuarioAtual.id
        );

        const podio = ranking.slice(0,3);
        const restantes = ranking.slice(3);

        container.innerHTML = `

            <div class="minha-posicao">

                <span class="texto-posicao">
                    Sua posição hoje
                </span>

                <div class="card-minha-posicao">

                    <div class="numero-posicao">
                        #${minhaPosicao + 1}
                    </div>

                    <div>

                        <div class="nome-lista">
                            ${usuarioAtual.nome}
                        </div>

                        <div class="info">
                            ${usuarioAtual.acertos} acertos • ${usuarioAtual.tempo_total}s
                        </div>

                    </div>

                </div>

            </div>

            <div class="podio">

                ${podio.map((participante,index)=>`

                    <div class="podio-card ${participante.id===usuarioAtual.id ? "usuario-atual":""} ${index===0 ? "primeiro":""}">

                        <div class="posicao">
                            ${
                                index===0
                                ? "🥇"
                                : index===1
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

                ${restantes.map((participante,index)=>`

                    <div class="card-ranking ${participante.id===usuarioAtual.id ? "usuario-atual":""}">

                        <div class="col">

                            <div class="posicao-lista">
                                ${index+4}
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

        console.error(erro);

        container.innerHTML = `
            <div class="hero">
                <h2>Erro ao carregar ranking.</h2>
            </div>
        `;

    }

}