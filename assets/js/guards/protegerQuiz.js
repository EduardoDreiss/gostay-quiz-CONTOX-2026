import {
    estaAutenticado,
    obterEtapa,
    definirEtapa
} from "../services/authService.js";

export function protegerQuiz() {

    if (!estaAutenticado()) {

        window.location.href = "/index.html";
        return;

    }

    if (obterEtapa() !== "instrucoes") {

        window.location.href = "/index.html";
        return;

    }

    definirEtapa("quiz");

}