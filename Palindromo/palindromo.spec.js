const esPalindromo = (input) => {
    return false;
}

describe('Ejercicio de Palindromo', () => {
    test('Palabra vacia devuelve falso', () => {
        const result = esPalindromo('')
        expect(result).toBe(false)
    })
})