'use strict';

const planet = (data) => {
    return {
        nombre:             data.name,
        periodoDeRotacion:  data.rotation_period,
        periodoOrbital:     data.orbital_period,
        diametro:           data.diameter,
        clima:              data.climate,
        gravedad:           data.gravity,
        terreno:            data.terrain,
        aguaSuperficial:    data.surface_water,
        poblacion:          data.population,
        residentes:         data.residents,
        peliculas:          data.films,
        creadoEn:           data.created,
        editadoEn:          data.edited,
        enlace:             data.url
    };
}

module.exports = {
    planet
}