import { aparear_valores } from './aparearvalores'

describe('Ejercicio de apareo de listas', () => {
    test('Test vacio', () => {
        var vec_ids = []
        var new_ids = []
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([])
    })

    test('Test con una nueva posicion', () => {
        var vec_ids = [ 5, 7, 8, 15, 20, 25, 30, 35, 40 ]
        var new_ids = [{ "id": 9, position: "4" }]
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([ 5, 7, 8, 9, 15, 20, 25, 30, 35, 40 ])
    })
})