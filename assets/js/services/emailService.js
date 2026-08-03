import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

const SERVICE_ID = "service_cp8r80k";
const TEMPLATE_ID = "template_psohl0w";
const PUBLIC_KEY = "Xn5ZsZaFw94HzMVyW";

emailjs.init(PUBLIC_KEY);

export async function enviarEmail(usuario) {

    if (!usuario) {
        throw new Error("Usuário não informado.");
    }

    if (!usuario.email) {
        throw new Error("E-mail do usuário não informado.");
    }

    if (!usuario.token_login) {
        throw new Error("Token de login não encontrado.");
    }

    const link = `${window.location.origin}/login.html?token=${usuario.token_login}`;

    const templateParams = {
        email: usuario.email,
        nome: usuario.nome,
        link: link
    };

    try {

        const resposta = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams
        );

        console.log("E-mail enviado com sucesso.", resposta);

        return resposta;

    } catch (erro) {

        console.error("Erro ao enviar e-mail:", erro);

        throw erro;

    }

}