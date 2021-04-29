const makeKeyFrom = (word) => word.split('').sort().join()

export const isAnagramOf = (firstWord, secondWord) => makeKeyFrom(firstWord) == makeKeyFrom(secondWord)

export const removeAnagramsFrom = (words) => {
    let elements = words.map(word => ({ original: word, reordered: makeKeyFrom(word)}))
    let uniqueKeys = [...new Set(elements.map(e => e.reordered))]
    let filteredValues = []

    uniqueKeys.forEach(key => {
        filteredValues.push(elements.find(e => key == e.reordered).original)
    })

    return filteredValues
}