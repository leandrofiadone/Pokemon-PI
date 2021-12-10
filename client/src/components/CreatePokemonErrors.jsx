export default function validaciones(input) {
    let errors = {};
    
    if (!input.nombre) {
        errors.nombre = 'Name is necessary';
    }

    if (input.vida > 255 || !input.vida) {
        errors.vida = 'Life is necessary and less than 255';
    }

    if (input.fuerza > 255 || !input.fuerza ) {
        errors.fuerza = 'Attack is necessary and less than 255';
    }

    if (input.defensa > 255 || !input.defensa) {
        errors.defensa = 'Defense is necessary and less than 255';
    }

    if (input.velocidad > 255 || !input.velocidad) {
        errors.velocidad = 'Speed is necessary and less than 255';
    }

    if (!input.altura) {
        errors.altura = 'Height is necessary';
    };

    if (!input.peso) {
        errors.peso = 'Weight is necessary';
    }

    return errors;
};