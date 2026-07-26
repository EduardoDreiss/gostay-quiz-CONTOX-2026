// import { supabase } from "../config/supabase.js";


// //criação do usuário

// export async function criarUsuario(usuario) {
    

//     const {data, error } = await supabase
//         .from("participantes")
//         .insert([usuario])
//         .select()
//         .single();

//     if (error){
//         console.log("erro ao cadastrar usuário: ", error);
//         throw error;
//     }

//     return data;
// }

// export async function buscarUsuariopPorID(id) {

//     const {data, error} = await supabase
//         .from("participantes")
//         .select("*")
//         .eq("id", id)
//         .single();

//         if (error){
//             console.log("erro ao buscar usuário: ", error);
//             throw error;
//         }
    
//         return data;
    
// }

import { supabase } from "../config/supabase.js";

export async function criarUsuario(usuario) {

    console.log("Enviando para o Supabase:", usuario);

    // const { data, error } = await supabase
    //     .from("participantes")
    //     .insert([usuario])
    //     .select()
    //     .single();

    // console.log("Data:", data);
    // console.log("Error:", error);

    const { data, error } = await supabase
    .from("participantes")
    .insert({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
    });

console.log(data);
console.log(error);

    if (error) {
        throw error;
    }

    return data;
}