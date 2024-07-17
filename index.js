let personas = [];

const entryForm = document.getElementById('entryForm');
const searchForm = document.getElementById('searchForm');
const resultadosDiv = document.getElementById('results');
const resumenDiv = document.getElementById('summary');
const cantidadInput = document.getElementById('cantidad');
const cantidadAtendidasInput = document.getElementById('cantidad2');
const buscarInput = document.getElementById('buscar');

function agregarPersona(nombre, edad) {
    let persona = {
        nombre: nombre,
        edad: edad
    };
    personas.push(persona);
    actualizarLocalStorage();
}

function actualizarLocalStorage() {
    localStorage.setItem('personas', JSON.stringify(personas));
}

function calcularPorcentaje(atendidas, total) {
    let porcentajeAtendidas = total > 0 ? (atendidas / total) * 100 : 0;
    return porcentajeAtendidas;
}

entryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = entryForm.elements['nombre'].value;
    let edad = parseInt(entryForm.elements['edad'].value);
    agregarPersona(nombre, edad);
    mostrarResultados();
    entryForm.reset();


    Toastify({
        text: "El registro de esta persona se completó con éxito",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #0056b3, #ccc)",
        },
        onClick: function(){} 
      }).showToast();
});

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let nombreBuscar = buscarInput.value;
    let personaEncontrada = personas.find(persona => persona.nombre === nombreBuscar);
    if (personaEncontrada) {
        resultadosDiv.textContent = `La persona ${personaEncontrada.nombre} fue encontrada y tiene ${personaEncontrada.edad} años.`;
    } else {
        resultadosDiv.textContent = `La persona con nombre ${nombreBuscar} no fue encontrada.`;
    }
    searchForm.reset();
});

function mostrarResultados() {
    let cantidadTotal = parseInt(cantidadInput.value);
    let cantidadAtendidas = parseInt(cantidadAtendidasInput.value);

    let porcentajeAtendidas = calcularPorcentaje(cantidadAtendidas, cantidadTotal);
    resumenDiv.textContent = `Porcentaje de personas atendidas: ${porcentajeAtendidas.toFixed(2)}%`;
}

function inicializar() {
    
    fetch('personas.json')
        .then(response => response.json())
        .then(data => {
            personas = data;
            mostrarResultados();
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    
    let storedData = localStorage.getItem('personas');
    if (storedData) {
        personas = JSON.parse(storedData);
    }
}

inicializar();
