import { isAnagramOf } from './sortingAnagrams'

describe('Ejercicio de Anagrama', () => {
    test('Palabras vacias devuelve verdadero', () => {
        const result = isAnagramOf('', '')
        expect(result).toBe(true)
    })
})