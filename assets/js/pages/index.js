import  { criarUsuario } from "../services/usuarioService.js";

console.log('js carregado');

 
document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM carregado");

    const form = document.getElementById("cadastroForm");

    console.log(form);

});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    form.addEventListener("submit", handleSubmit);
})

async function handleSubmit(event) {
    event.preventDefault();

    // const nome = document.getElementById("nome").value.trim();

    const nome = limpezaNome(
        document.getElementById("nome").value
    );

    const email = document.
                getElementById("email")
                .value
                .trim()
                .toLowerCase();


    const telefone = limpezaTelefone(
                    document.getElementById("telefone").value
    );

    if (!validarFormulario(nome,email,telefone)){
        return;
    }

    const usuario = {

        nome,
        email,
        telefone,
        // dataCadastro : new Date().toISOString().slice(0, 16)
    };

    console.log("Usuário: ", usuario)

    try {
        
        const usuarioCriado = await criarUsuario(usuario)

        console.log(usuarioCriado);

        sessionStorage.setItem(
            "usuario",
            JSON.stringify(usuarioCriado)
        );

        window.location.href = "instruçõesQuiz.html";

    } catch (erro) {
        
        

        console.error("Erro completo:", erro);
        console.error("Código:", erro.code);
        console.error("Mensagem:", erro.message);
        console.error("Detalhes:", erro.details);
        console.error("Hint:", erro.hint);
    
        alert("Erro ao cadastrar participante.");
    }




}



function validarEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarFormulario(nome, email, telefone){


    const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regexNome.test(nome)) {

        alert("O nome possui caracteres inválidos.");

        return false;
    }


    if (nome.length < 3 || nome.length > 80){
        alert('O nome deve conter entre 3 e 80 caractéres');
        return false;
    }

    if (!validarEmail(email)){
        alert('informe um email válido');
        return false;
    }

    if (email.length > 100) {

        alert("E-mail muito grande.");

        return false;
    }
    
    if (telefone.length < 10 || telefone.length > 13){
        alert('informe um telefone válido');
        return false;
    }

    return true;
}

function limpezaNome(nome){
    return nome.trim().replace(/\s+/g," ")
}

function limpezaTelefone(telefone){
    return telefone.replace(/\D/g, "")
}

