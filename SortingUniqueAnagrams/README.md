# Ordenamiento de Anagramas Únicos

## Descripción
Un anagrama es una palabra que se forma con los mismos caracteres que otra. Dada una matriz de cadenas, elimine cada cadena que sea un anagrama de una cadena anterior, luego devuelva la matriz restante en orden ordenado

## Ejemplo
  str=['code','doce','ecod','framer','frame']

  - 'code' y 'doce' son anagramas. Elimine 'doce' de la matriz y mantenga el 'code' de la primera aparición en la matriz
  - 'code' y 'ecod' son anagramas. Elimine 'ecod' de la matriz y mantenga el 'code'
  - 'code' y 'framer' no son anagramas. Mantenga ambas cadenas en la matriz
  - 'frame' y 'framer' no son anagramas. Mantenga ambas cadenas en la matriz
  - Ordene las cadenas restantes en orden ascendente ['code','frame','framer']
