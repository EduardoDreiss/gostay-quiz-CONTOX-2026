import { supabase } from "../config/supabase.js";


//criação do usuário

export async function criarUsuario(usuario) {
    

    const {data, error } = await supabase
        .from("usuarios")
        .insert([usuario])
        .select()
        .single();

    if (error){
        console.log("erro ao cadastrar usuário: ", error);
        throw error;
    }

    return data;
}

export async function buscarUsuariopPorID(id) {

    const {data, error} = await supabase
        .from("participantes")
        .select("*")
        .eq("id", id)
        .single();

        if (error){
            console.log("erro ao buscar usuário: ", error);
            throw error;
        }
    
        return data;
    
}