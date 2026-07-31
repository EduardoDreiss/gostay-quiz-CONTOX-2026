import { supabase } from "../config/supabase.js";

export async function criarUsuario(usuario) {

    console.log("Enviando para o Supabase:", usuario);
    console.log(await supabase.auth.getSession());
    const { data, error } = await supabase
    .from("participantes")
    .insert({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
    })
    .select()
    .single();

console.log(data);
console.log(error);

    if (error) {
        throw error;
    }

    return data;
}