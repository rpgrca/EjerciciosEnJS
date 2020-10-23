export const filtroDeCaracteresRepetidos = (input) => {
    return [...new Set(input)].join('')
}