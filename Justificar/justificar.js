export const justificar = (input, longitud) => {
    if (longitud < 1) return [ input ]

    var regex = new RegExp(`(.{1,${longitud}})[ ]*`, 'g')
    return input.match(regex)
                .map(Function.prototype.call, String.prototype.trim)
}