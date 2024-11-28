document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los botones
    const botones = document.querySelectorAll(".botones button");
    
    //le añadimos a cada boton su evento de click
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            // Saca el id del botón seleccionado que es el equipo
            const equipoSeleccionado = boton.id;

            // Quitamos formato a todas las imágenes 
            const imagenes = document.querySelectorAll(".imagenes img");
            imagenes.forEach(img => {
                img.style.border = "none"; 
                img.style.transform = "scale(1)"; 
            });

            // Resalta las imágenes con el id que coincide con el equipo seleccionado
            const imagenesEquipo = document.querySelectorAll(".imagenes img");
            imagenesEquipo.forEach(img => {
                if(img.id === equipoSeleccionado) {         //Si coincide con el id del equipo seleccionado, quiere decir que pertenece a ese equipo, por lo tanto se resalta
                    img.style.border = "5px solid limegreen"; // Aplica el borde verde llamativo
                    img.style.transform = "scale(1.1)"; // Aumenta el tamaño de la imagen
                }
            });
        });
    });
});

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

