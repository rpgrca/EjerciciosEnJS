export const isAnagramOf = (firstWord, secondWord) => {
    return firstWord.split('').sort().join() == secondWord.split('').sort().join();
}

export const removeAnagramsFrom = (words) => {
    return words;
}