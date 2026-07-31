export function salvarUsuario(usuario) {

    sessionStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    sessionStorage.setItem(
        "autenticado",
        "true"
    );

    sessionStorage.setItem(
        "etapa",
        "cadastro"
    );

}

export function obterUsuario() {

    return JSON.parse(
        sessionStorage.getItem("usuario")
    );

}

export function estaAutenticado() {

    return sessionStorage.getItem("autenticado") === "true";

}

export function definirEtapa(etapa) {

    sessionStorage.setItem(
        "etapa",
        etapa
    );

}

export function obterEtapa() {

    return sessionStorage.getItem("etapa");

}

export function logout() {

    sessionStorage.clear();

}