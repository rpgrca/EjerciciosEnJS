const esPalindromo = (input) => {
    if (input.length == 1)
        return true;

    return false;
}

describe('Ejercicio de Palindromo', () => {
    test('Palabra vacia devuelve falso', () => {
        const result = esPalindromo('')
        expect(result).toBe(false)
    })

    test('Palabra de una letra devuelve true', () => {
        const result = esPalindromo('a')
        expect(result).toBe(true)
    })
})