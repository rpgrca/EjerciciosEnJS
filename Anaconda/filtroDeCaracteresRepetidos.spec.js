const filtroDeCaracteresRepetidos = (input) => {
    if (input.length > 0)
        return 'a'

    return ''
}

describe('Ejercicio de Anaconda', () => {
    test('Palabra vacia devuelve vacio', () => {
        const result = filtroDeCaracteresRepetidos('')
        expect(result).toBe('')
    })

    test('Palabra con dos letras iguales devuelve palabra con una letra', () => {
        const result = filtroDeCaracteresRepetidos('aaa')
        expect(result).toBe('a')
    })
})
