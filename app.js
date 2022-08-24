var cards,templateCard,fragment,templateCarrito,templateFooter,items,footer

document.addEventListener("DOMContentLoaded", () =>{
    cards = document.getElementById("cards");
    templateCard = document.getElementById("template-card").content 
    templateCarrito = document.getElementById("template-carrito").content
    fragment = document.createDocumentFragment(); 
    templateFooter = document.getElementById("template-footer").content
    items = document.getElementById("items")
    footer = document.getElementById("footer")

     fetchData()
     cards.addEventListener("click", e =>{
        addCarrito(e)
    })
})

const fetchData = async() => {
    try{
        const res = await fetch("api.json")
        const discos = await res.json()
        pintarCards(discos)
    }catch(error){
        console.log(error)
    }
    
}
      

const pintarCards = data => {    
      data.forEach(producto =>{
        templateCard.querySelector("h5").textContent = producto.title
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id
        const clone =templateCard.cloneNode(true)
        fragment.appendChild(clone)  
    })  
    cards.appendChild(fragment)
}


const addCarrito = e => {
    if(e.target.classList.contains("btn-dark")){        
      setCarrito(e.target.parentElement) 
    }
    e.stopPropagation()
}

let carrito = {}
const setCarrito = objeto => {
    const producto ={
        id: objeto.querySelector(".btn-dark").dataset.id,
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }else {
        producto.cantidad = 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()
}
const pintarCarrito = () =>{
    items.innerHTML = ""
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td")[0].textContent = producto.title
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()
}

const pintarFooter = () =>{
    footer.innerHTML = ""
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">carrito vacio - comienze a comprar!</th>
        `
    }


}


