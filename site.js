
function Bienvenido(nombre, apellido){
    alert("Bienvenido " + nombre + " " + apellido);
}
Bienvenido(prompt("ingrese el nombre"), prompt("ingrese el apellido"))

//array completar datos  constructor

class Persona {
    constructor(edad, correoElectronico){
    this.edad = edad;
    this.correoElectronico = correoElectronico;
    } 
}

/* -----Inicializar objeto con funcion --- */
function crearPersona(){
    const edad = prompt("Ingresa tu Edad");
    const correoElectronico = prompt("Ingresa tu correo Electronico");
    return new Persona(edad,correoElectronico);
}

/*--- "Menu" de personas --- */
let persona = crearPersona();
console.log("Datos de la persona: ", persona.edad, persona.correoElectronico);

//construcutor de class disco

class Disco {
     constructor(disco) {
        this.id = disco.id;
        this.nombre= disco.nombre;
        this.discografica = disco.discografica;
        this.anio = disco.anio;
        this.genero = disco.genero;
        this.precio = disco.precio;
        this.cantidad = 0;
     }
     
     agregarUnidad(){
        this.cantidad++;
     }

     calcularPrecioTotal() {
        return this.precio * this.cantidad;
     }
}

//constante y variable

const discos = [
    new Disco({
        id: "1",
        nombre: "Abbey Road Anniversary",
        discografica: "Apple Records",
        anio: 1969,
        genero: "rock",
        precio: 3000,
    }),
    new Disco({
       id: "2",
       nombre: "With The Beatles",
       discografica: "Apple Records",
       anio: 1963,
       genero: "rock and roll",
       precio: 2700,
    }),
    new Disco({
       id: "3",
       nombre: "The Beatles The White Album",
       discografica: "Apple Records",
       anio: 1968,
       genero: "Hard Rock",
       precio: 2800,
    }),
    new Disco({
       id: "4",
       nombre: "Rubber Soul",
       discografica: "Apple Records",
       anio: 1965,
       genero: "rock and pop",
       precio: 1900,
    }),
    new Disco({
       id: "5",
       nombre: "Sgt. Pepper's Lonely Hearts Club Band 2017 Stereo Mix",
       discografica: "Apple Records",
       anio: 2017,
       genero: "rock psicodelico",
       precio: 3500,
    }),
];

let carrito = [];


const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};
for (const disco of discos){
    guardarLocal(disco.id, JSON.stringify(disco));
}

//Declarar funcion

function mostrarMenuDeCompra(){
    let listaDeDiscos = "";

    for(const disco of discos){
        listaDeDiscos +=  `${disco.id}: ${disco.discografica}: ${disco.nombre}. Precio: $${disco.precio} \n`;
    }

    let idDisco = prompt(`"escriba el numero del 💿 que desee comprar o escriba "ESC" para finalizar"
        ${listaDeDiscos} \n`);

    while (idDisco !== "ESC"){
        let discoEnCarrito = carrito.find((elemento) => elemento.id == idDisco);
        if (discoEnCarrito){
            discoEnCarrito.agregarUnidad();
            alert(`se sumo otro disco al carrito: ${discoEnCarrito.nombre} 
            Unidades: ${discoEnCarrito.cantidad}`);
            console.table(carrito);
        } else {
            let nuevoDisco = discos.find((elemento) => elemento.id == idDisco);
            nuevoDisco.agregarUnidad()
            carrito.push(nuevoDisco);
            alert (`Se ha añadido al carrito un disco ${nuevoDisco.nombre}`);
            console.table(carrito);
        }   
    
        idDisco = prompt(`Desea seguir comprando? Escriba el número del producto a comprar, o escriba 'ESC' para finalizar
        ${listaDeDiscos}`);
    }
}

// mostrarMenuDeCompra();

function calcularPrecio(precioProducto, pagaEnEfectivo){
    let precioFinal=pagaEnEfectivo ? precioProducto * 0.9 : precioProducto;
    alert("En efectivo $" +precioFinal);
}


let pagaEnEfectivo = prompt("pagas en efectivo?").toLowerCase() == "Si"; 
calcularPrecio(obtenerPrecioTotal(), pagaEnEfectivo);


//precio total

function obtenerPrecioTotal() {
    let precioTotal = 0;
    for (const disco of carrito) {
        precioTotal += disco.calcularPrecioTotal();
    }
    return precioTotal;
}

//CAROUSEL 

document.addEventListener("DOMContentLoaded",() =>{
    const elementosCarrousel = document.querySelectorAll(".carousel");
    M.Carousel.init(elementosCarrousel, {
        duration: 150,
        dist: -80,
        shift: 5,
        padding: 5,
        numVisible:3,
        indicators: true,
        noWrap: true, 
    });
});

