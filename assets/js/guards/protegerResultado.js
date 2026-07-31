import {
    estaAutenticado,
    obterEtapa,
    definirEtapa
} from "../services/authService.js";

export function protegerResultado(){
    
    if (!estaAutenticado()) {

        window.location.href = "index.html";

    }

    if (obterEtapa() !== "quiz") {

        window.location.href = "index.html";

    }

    definirEtapa("resultado");
}