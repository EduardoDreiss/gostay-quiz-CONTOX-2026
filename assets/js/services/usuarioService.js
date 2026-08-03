// kys
import { supabase } from "../config/supabase.js";

export async function criarUsuario(usuario) {

    console.log("Enviando para o Supabase:", usuario);

    const token = crypto.randomUUID();

    const { data, error } = await supabase
        .from("participantes")
        .insert({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            token_login: token
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

export async function buscarUsuarioPorToken(token) {

    const { data, error } = await supabase
        .from("participantes")
        .select("*")
        .eq("token_login", token)
        .single();

    if (error) {
        throw error;
    }

    return data;

}

export async function invalidarToken(id) {

    const { error } = await supabase
        .from("participantes")
        .update({
            token_login: null
        })
        .eq("id", id);

    if (error) {
        throw error;
    }

}

export async function buscarParticipanteHoje(email, telefone) {

    const hoje = new Date().toISOString().split("T")[0];

    const inicioDia = `${hoje}T00:00:00`;
    const fimDia = `${hoje}T23:59:59`;

    const { data, error } = await supabase
        .from("participantes")
        .select("*")
        .or(`email.eq.${email},telefone.eq.${telefone}`)
        .gte("data_cadastro", inicioDia)
        .lt("data_cadastro", fimDia)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;

}

// export async function buscarUsuarioPorToken(token) {

//     const { data, error } = await supabase
//         .from("participantes")
//         .select("*")
//         .eq("token_login", token)
//         .single();

//     if (error) {
//         throw error;
//     }

//     return data;

// }

export async function validarEmail(id) {

    const { data, error } = await supabase
        .from("participantes")
        .update({
            email_validado: true,
            token_login: null
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

}