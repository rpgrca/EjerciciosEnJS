const makeKeyFrom = (word) => word.split('').sort().join('')

export const isAnagramOf = (firstWord, secondWord) => makeKeyFrom(firstWord) == makeKeyFrom(secondWord)

export const removeAnagramsFrom = (words) => {
    let originalWordWithKeys = words.map(word => ({ original: word, key: makeKeyFrom(word)}))
    let uniqueKeys = [...new Set(originalWordWithKeys.map(e => e.key))]
    let filteredValues = []

    uniqueKeys.forEach(key => {
        filteredValues.push(originalWordWithKeys.find(e => key == e.key).original)
    })

    return filteredValues
}

export const sortUniqueAnagramsFrom = (words) => removeAnagramsFrom(words).sort()