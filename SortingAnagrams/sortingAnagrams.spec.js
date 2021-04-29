import { isAnagramOf, removeAnagramsFrom } from './sortingAnagrams'

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

describe('Ejercicio de Eliminacion', () => {
    test('Si no hay anagramas en la lista retorna la misma lista', () => {
        const input = ['code', 'frame']
        const result = removeAnagramsFrom(input)
        expect(result).toBe(input)
    })
})