import { isAnagramOf } from './sortingAnagrams'

describe('Ejercicio de Anagrama', () => {
    test('Palabras vacias devuelve verdadero', () => {
        const result = isAnagramOf('', '')
        expect(result).toBe(true)
    })

    test('Palabras distintas devuelve falso', () => {
        const result = isAnagramOf('hola', 'chau')
        expect(result).toBe(false)
    })

    test('Anagramas devuelve verdadero', () => {
        const result = isAnagramOf('code', 'doce')
        expect(result).toBe(true)
    })
})