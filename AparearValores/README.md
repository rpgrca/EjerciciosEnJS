# Aparear valores

## Descripción
Tengo 2 vectores, uno con ids y otro con una estructura con ids y la posicion en la que debe estar al concatenarse con el primer vector. 

```
vec_ids=[5,7,8,15,20,25,30,35,40]
new_ids = [{"id":9,position:"4"},{"id":5,position:"7"},{{"id":9,position:"2"}}]
resultado = [5,7,9,8,9,15,20,5,25,5,30,35,40]
```

## Consideraciones
1. *new_ids* esta desordenado o puede estar desordenado
1. *new_ids* puede estar vacio
1. no importa que el resultado de los ids esten desordenado.
1. *position* empieza en  0
1. *new_ids* puede tener 2 ids con posiciones contiguas para ser agregadas.
