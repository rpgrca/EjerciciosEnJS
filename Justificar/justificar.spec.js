import { justificar } from './justificar'

describe('Ejercicio de Justificacion', () => {
    test('Longitud invalida devuelve cadena original', () => {
        const result = justificar('a', 0)
        expect(result).toBe('a')
    })

    test.each([6,10])('Longitud mayor o igual a longitud de cadena (%i) devuelve cadena', (n) => {
        const result = justificar('cadena', n)
        expect(result).toBe('cadena')
    })
})
