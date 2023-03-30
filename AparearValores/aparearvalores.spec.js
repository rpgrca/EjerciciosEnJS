import { aparear_valores } from './aparearvalores'

describe('Ejercicio de apareo de listas', () => {
    test('Test vacio', () => {
        var vec_ids = []
        var new_ids = []
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([])
    })

    test('Test con datos pero sin nuevas posiciones', () => {
        var vec_ids = [ 5, 7, 8, 15, 20, 25, 30, 35, 40 ]
        var new_ids = []
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([ 5, 7, 8, 15, 20, 25, 30, 35, 40 ])
    })

    test('Test con datos y una nueva posicion', () => {
        var vec_ids = [ 5, 7, 8, 15, 20, 25, 30, 35, 40 ]
        var new_ids = [{ "id": 9, position: "4" }]
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([ 5, 7, 8, 15, 9, 20, 25, 30, 35, 40 ])
    })

    test('Test con datos y varias posiciones ordenadas', () => {
        var vec_ids = [ 5, 7, 8, 15, 20, 25, 30, 35, 40 ]
        var new_ids = [{ "id": 9, position: "2" }, { "id": 9, position: "4" }]
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([ 5, 7, 9, 8, 9, 15, 20, 25, 30, 35, 40 ])
    })

    test('Test con datos y varias posiciones desordenadas', () => {
        var vec_ids = [ 5, 7, 8, 15, 20, 25, 30, 35, 40 ]
        var new_ids = [{ "id": 9, position: "4" }, { "id": 9, position: "2" }]
        var resultado = aparear_valores(vec_ids, new_ids)
        expect(resultado).toStrictEqual([ 5, 7, 9, 8, 9, 15, 20, 25, 30, 35, 40 ])
    })
})