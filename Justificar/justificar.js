export const justificar = (input, longitud) => {
    if (longitud < 1) return [ input ]

    var lineas = input.split(' ').reduce(function(lineas, palabra) {
        var linea_actual = lineas[lineas.length - 1]



        linea_actual.join('').length


        var longitud_linea_actual = linea_actual.join('').length
        var tamano_cadena = palabra.length

        if (longitud_linea_actual > 0) {
            tamano_cadena += longitud_linea_actual + 1
        }

        tamano_cadena




        if (hay_lugar_en_la_linea(tamano_cadena, longitud)) {
            agregar_palabra_a(linea_actual, palabra)
        }
        else {
            var index = 1
            var espacio = longitud - longitud_linea_actual
            while (espacio-- > 0)
            {
                linea_actual[index] += ' '
                index += 2
                if (index >= linea_actual.length)
                {
                    index = 1
                }
            }

            lineas.push([palabra])
        }

        return lineas
    }, [[]])

    return generar_parrafo_justificado(lineas)
}

const generar_parrafo_justificado = (lineas) =>
    lineas.map((linea) => linea.join(''))

const agregar_palabra_a = (linea, palabra) => {
    if (linea.length != 0)
        linea.push(' ')

    linea.push(palabra)
}

const hay_lugar_en_la_linea = (tamano_cadena, longitud) =>
    tamano_cadena <= longitud