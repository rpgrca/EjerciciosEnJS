import { esPalindromo } from './palindromo'

describe('Ejercicio de Palindromo', () => {
    test('Palabra vacia devuelve falso', () => {
        const result = esPalindromo('')
        expect(result).toBe(false)
    })

    test('Palabra de una letra devuelve true', () => {
        const result = esPalindromo('a')
        expect(result).toBe(true)
    })

    test('Palabra de mas de una letra que es palindromo devuelve true', () => {
        const result = esPalindromo('neuquen')
        expect(result).toBe(true)
    })

    test('Palabra de mas de una letra que no es palindromo devuelve false', () => {
        const result = esPalindromo('ahora')
        expect(result).toBe(false)
    })

    test('Palindromo con mayusculas y minúsculas devuelve true', () => {
        const result = esPalindromo('Neuquen')
        expect(result).toBe(true)
    })
})