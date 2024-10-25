'use strict';

const PLANET = async (
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
    created,
    edited,
    url,
) => {
    return {
        nombre: name,
        periodoDeRotacion: rotation_period,
        periodoOrbital: orbital_period,
        diametro: diameter,
        clima: climate,
        gravedad: gravity,
        terreno: terrain,
        aguaSuperficial: surface_water,
        poblacion: population,
        residentes: residents,
        peliculas: films,
        creadoEn: created,
        editadoEn: edited,
        enlace: url
    };
}

module.exports = {
    PLANET
}