const discos = [
    {id:1, nombre:"Abey road", precio:3000},
    {id:2, nombre:"With The Beatles", precio:2700},
    {id:3, nombre:"The Beatles The White Album", precio:2800},
    {id:4, nombre:"Rubber Soul", precio:1900},
    {id:5, nombre:"Sgt. Pepper's Lonely Hearts Club Band 2017 Stereo Mix", precio:3500}
];


document.addEventListener("DOMContentLoaded",() =>{
    for (const disco of discos){
    let contenedor = document.createElement("div");
    contenedor.innerHTML = 
                           `<h3> ID: ${disco.id}</h3>
                           <p>disco: ${disco.nombre}</p>
                           <b> $${disco.precio}</b>`;

    contenedor.className = "product"
    document.body.appendChild(contenedor);
    }
});