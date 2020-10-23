import { filtroDeCaracteresRepetidos } from './filtroDeCaracteresRepetidos'

describe('Ejercicio de Anaconda', () => {
    test('Palabra vacia devuelve vacio', () => {
        const result = filtroDeCaracteresRepetidos('')
        expect(result).toBe('')
    })

    test('Palabra con dos letras iguales devuelve palabra con una letra', () => {
        const result = filtroDeCaracteresRepetidos('aaa')
        expect(result).toBe('a')
    })

    test('Palabra anaconda devuelve ancod', () => {
        const result = filtroDeCaracteresRepetidos('anaconda')
        expect(result).toBe('ancod')
    })

    test.each`
        input           | expected
        ${'murcielago'} | ${'murcielago'}
        ${'oso'}        | ${'os'}
        ${'hospital'}   | ${'hospital'}
        ${'alabama'}    | ${'albm'}
    `('Palabra $input es convertida a $expected', ({ input, expected }) => {
        expect(filtroDeCaracteresRepetidos(input)).toBe(expected)
    })
})