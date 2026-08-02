// import { supabase } from "../config/supabase.js";

// export async function criarUsuario(usuario) {

//     console.log("Enviando para o Supabase:", usuario);
//     console.log(await supabase.auth.getSession());
//     const { data, error } = await supabase
//     .from("participantes")
//     .insert({
//         nome: usuario.nome,
//         email: usuario.email,
//         telefone: usuario.telefone
//     })
//     .select()
//     .single();

// console.log(data);
// console.log(error);

//     if (error) {
//         throw error;
//     }

//     return data;
// }

// // export async function buscarUsuario(id) {
// //     console.log("buscando usuario pelo id", id);
// //     const {data, error} = await supabase
// //     .from("participantes")
// // }

import { supabase } from "../config/supabase.js";

export async function criarUsuario(usuario) {

    console.log("Enviando para o Supabase:", usuario);

    const { data, error } = await supabase
        .from("participantes")
        .insert({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function buscarUsuario(id) {

    const { data, error } = await supabase
        .from("participantes")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function buscarParticipanteHoje(email, telefone) {

    const hoje = new Date().toISOString().split("T")[0];

    const inicioDia = `${hoje}T00:00:00`;
    const fimDia = `${hoje}T23:59:59`;

    const { data, error } = await supabase
        .from("participantes")
        .select("*")
        .or(
            `email.eq.${email},telefone.eq.${telefone}`
        )
        .gte("data_cadastro", inicioDia)
        .lt("data_cadastro", fimDia)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;

}