// import { supabase } from "../config/supabase.js";

// export async function atualizarPontuacao(id, resultado){

//     const { data, error } = await supabase

//         .from("participantes")

//         .update({

//             acertos: resultado.acertos,

//             tempo_total: resultado.tempo

//         })

//         .eq("id", id)

//         .select()

//         .single();

//     if(error){
//         throw error;
//     }

//     return data;

// }

import { supabase } from "../config/supabase.js";

export async function atualizarPontuacao(id, resultado) {
    if (!id) {
        throw new Error("ID do participante não informado.");
    }

    const { data, error } = await supabase
        .from("participantes")
        .update({
            acertos: resultado.acertos,
            tempo_total: resultado.tempo
        })
        .eq("id", id)
        .select() // <-- Essencial para retornar a linha atualizada
        .single();

    if (error) {
        throw error;
    }

    return data;
}