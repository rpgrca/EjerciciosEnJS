import { isAnagramOf, removeAnagramsFrom, sortUniqueAnagramsFrom } from './sortingAnagrams'

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
        expect(result).toStrictEqual(input)
    })

    test('Si hay anagrama en la lista retornar primero', () => {
        const input = ['code', 'doce', 'ecod']
        const result = removeAnagramsFrom(input)
        expect(result).toStrictEqual(['code'])
    })
})

describe('Ejercicio de Ordenamiento', () => {
    test('Ordenar los anagramas unicos obtenidos', () => {
        const input = ['code', 'doce', 'ecod', 'framer', 'frame']
        const result = sortUniqueAnagramsFrom(input)
        expect(result).toStrictEqual(['code', 'frame', 'framer'])
    })
})