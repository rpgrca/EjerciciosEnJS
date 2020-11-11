export const justificar = (input, longitud) => {
    if (longitud < 1) return [ input ]

    var lineas = input.split(' ').reduce(function(lineas, palabra) {
        var texto_anterior = lineas[lineas.length - 1].join('')
        var texto = texto_anterior
        if (texto.length != 0) {
            texto = texto.concat(" ")
        }

        texto = texto.concat(palabra)
        if (texto.length <= longitud) {
            if (lineas[lineas.length - 1].length != 0) {
                lineas[lineas.length - 1] = [...lineas[lineas.length - 1], ' ', palabra]
            }
            else {
                lineas[lineas.length - 1].push([palabra])
            }
        }
        else {
            var index = 1
            var espacio = longitud - texto_anterior.length
            while (espacio-- > 0)
            {
                lineas[lineas.length - 1][index] = lineas[lineas.length - 1][index].concat(' ')
                index += 2
                if (index >= lineas[lineas.length - 1].length)
                {
                    index = 1
                }
            }

            lineas.push([palabra])
        }

        return lineas
    }, [[]])

    return lineas.map((linea) => linea.join('').trim())
}