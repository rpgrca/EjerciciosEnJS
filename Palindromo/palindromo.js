export const esPalindromo = (input) => {
    if (input.length < 1) return false
    return input.toUpperCase() == input.split("").reverse().join("").toUpperCase()
}