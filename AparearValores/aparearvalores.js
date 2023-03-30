export const aparear_valores = (vector_original, new_ids) => {
    if (new_ids.length == 0) {
        return vector_original
    }

    var index_para_vector_original = 0
    var index_para_new_ids = 0
    var current_index = 0
    var new_ids_ordenado = new_ids.sort((p, q) => p.position - q.position)
    var vector_modificado = []

    while (index_para_vector_original < vector_original.length && index_para_new_ids < new_ids.length) {

        if (current_index == new_ids_ordenado[index_para_new_ids].position) {
            var valor_a_agregar = 0
            do {
                valor_a_agregar = new_ids_ordenado[index_para_new_ids++].id
            } while (index_para_new_ids < new_ids.length && current_index == new_ids_ordenado[index_para_new_ids].position)

            vector_modificado.push(valor_a_agregar)
        }
        else {
            vector_modificado.push(vector_original[index_para_vector_original++])
        }
        current_index++;
    }

    for (current_index = index_para_vector_original; current_index < vector_original.length; current_index++) {
        vector_modificado.push(vector_original[current_index])
    }

    return vector_modificado
}
