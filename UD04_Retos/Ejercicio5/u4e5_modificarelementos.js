const jugadoresInfo = {
    Mbappe: "Kylian Mbappé, delantero estrella del Real Madrid y de la selección francesa, conocido por su velocidad y habilidad goleadora.",
    Haaland: "Erling Haaland, delantero del Manchester City, considerado uno de los mejores goleadores jóvenes del mundo por su potencia y precisión.",
    Salah: "Mohamed Salah, extremo del Liverpool y capitán de la selección egipcia, famoso por su agilidad y capacidad para marcar goles.",
    Vinicius: "Vinícius Júnior, delantero del Real Madrid, destacado por su explosividad, regates y contribuciones ofensivas en grandes partidos. MI BALON DE ORO",
    Arnold: "Trent Alexander-Arnold, lateral derecho del Liverpool, conocido por su excelente capacidad de pase y contribución ofensiva desde la defensa.",
    Lamine: "Lamine Yamal, joven promesa del FC Barcelona, ya destacado por su técnica y visión de juego a una edad temprana.",
    Kevin: "Kevin De Bruyne, mediocampista belga del Manchester City, considerado uno de los mejores centrocampistas del mundo por su creatividad y precisión en el pase.",
    Pedri: "Pedri González, mediocampista del FC Barcelona, conocido por su habilidad técnica, control del balón y madurez en el juego a pesar de su juventud."
};

const mostrarInformacion = (jugador) => {
    const informacion = document.getElementById('panelDatos');
    informacion.innerHTML = `<h2>Información de Jugador</h2><p>${jugadoresInfo[jugador]}</p>`;
};