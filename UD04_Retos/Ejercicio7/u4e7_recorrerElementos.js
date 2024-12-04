window.addEventListener("load", () => {
    document.getElementById("analizar").addEventListener("click", analizarFormulario);
});

const analizarFormulario = () => {
    document.getElementById("resultados").style.display = "block";
    const formulario = document.querySelector('#formulario form');
    const resultados = [];

    Array.from(formulario).forEach((element) => {
        const info = {
            tipo: element.tagName.toLowerCase() === 'input' ? element.type : 'textarea', 
            valor: element.value || 'No tiene valor', 
            clase: element.className || 'No tiene clase' 
        };
        resultados.push(info);
    });

    const divResultados = document.getElementById("resultados");
    divResultados.innerHTML = ""; 

    for (let i = 0; i < resultados.length; i++) {
        const resultado = resultados[i];
        divResultados.innerHTML += `<p>${i + 1}. Tipo: ${resultado.tipo}, Valor: ${resultado.valor}, Clase: ${resultado.clase}</p>`;
    }  
};
