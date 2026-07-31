import {
    estaAutenticado,
    obterEtapa,
    definirEtapa
} from "../services/authService.js";

export function protegerInstrucoes(){
    if (!estaAutenticado()) {

        window.location.href = "index.html";
    
    }
    
    if (obterEtapa() !== "cadastro") {
    
        window.location.href = "index.html";
    
    }
    
    definirEtapa("instrucoes");
}