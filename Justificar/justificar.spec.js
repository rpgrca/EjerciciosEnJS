import { justificar } from './justificar'

describe('Ejercicio de Justificacion', () => {
    test('Longitud invalida devuelve cadena original', () => {
        const result = justificar('a', 0)
        expect(result).toStrictEqual([ 'a' ])
    })

    test.each([6,10])('Longitud mayor o igual a longitud de cadena (%i) devuelve cadena', (n) => {
        const result = justificar('cadena', n)
        expect(result).toStrictEqual([ 'cadena' ])
    })

    test('Longitud de cadena mayor a longitud y palabra termina justo solamente debe dividir', () => {
        const result = justificar('Esta es una cadena de muchos caracteres', 21)
        expect(result).toStrictEqual([ 'Esta es una cadena de',
                                       'muchos caracteres' ])
    })

    test('Con multiples lineas que terminan correctamente solamente debe dividir', () => {
        const result = justificar('Esta otra cadena es bastante parecida a la cadena anterior pero con tres lineas bien escritas', 39)
        expect(result).toStrictEqual([ 'Esta otra cadena es bastante parecida a',
                                       'la cadena anterior pero con tres lineas',
                                       'bien escritas' ])
    })

    test('Con multiples lineas que no terminan bien debe dividir y justificar', () => {
        const result = justificar('Esta es una cadena de varios caracteres que deberia ser justificada.', 30)
        expect(result).toStrictEqual([ 'Esta  es  una cadena de varios',
                                       'caracteres   que  deberia  ser',
                                       'justificada.'])
    })
})