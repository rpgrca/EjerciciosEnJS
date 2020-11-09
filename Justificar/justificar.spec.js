import { justificar } from './justificar'

describe('Ejercicio de Justificacion', () => {
    test('Longitud invalida devuelve cadena original', () => {
        const result = justificar('a', 0)
        expect(result).toBe('a')
    })
})
