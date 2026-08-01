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


//funcao apenas para trazer a pontuação do usuario para a pag
//de resultados. 

export async function pesquisarPontuacao(id) {
    if (!id){
        throw new Error("ID do partifipante não informado");
    }

    const { data, error } = await supabase
    .from("participantes")
    .select("acertos, tempo_total")
    .eq("id", id)
    .single();

    if(error){
        throw error;
    }

    return data;


}

export async function buscarRankingHoje() {

    const hoje = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("participantes")
        .select("nome, acertos, tempo_total")
        .gte("data_cadastro", `${hoje}T00:00:00`)
        .lt("data_cadastro", `${hoje}T23:59:59`)
        .order("acertos", { ascending: false })
        .order("tempo_total", { ascending: true })
        .limit(3);

    if (error) {
        throw error;
    }

    return data;

}

export async function buscarRankingCompletoHoje() {

    const hoje = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("participantes")
        .select("id, nome, acertos, tempo_total")
        .gte("data_cadastro", `${hoje}T00:00:00`)
        .lt("data_cadastro", `${hoje}T23:59:59`)
        .order("acertos", { ascending: false })
        .order("tempo_total", { ascending: true });

    if (error) {
        throw error;
    }

    return data;
}