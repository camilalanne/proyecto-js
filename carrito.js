var fragment,templateCarrito,templateFooter,items,footer

document.addEventListener("DOMContentLoaded", () =>{
    templateCarrito = document.getElementById("template-carrito").content
    fragment = document.createDocumentFragment(); 
    templateFooter = document.getElementById("template-footer").content
    items = document.getElementById("items")
    footer = document.getElementById("footer")

    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        pintarCarrito()
    }
    items.addEventListener("click", e =>{
    btnAccion(e) 
})
})

let carrito = {}

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

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//nuevo 

const pintarFooter = () =>{
    footer.innerHTML = ""
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">carrito vacio - comienze a comprar!</th>
        `
    }else {
         const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc + cantidad * precio,0)
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.querySelector("span").textContent = nPrecio
    
    const clone =templateFooter.cloneNode(true)
    fragment.appendChild(clone) 
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById("vaciar-carrito")
    btnVaciar.addEventListener("click", () =>{
        carrito = {} 
        pintarCarrito()
    })
    }
       
}

const btnAccion = e =>{
    if(e.target.classList.contains("btn-info")){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++ 
        carrito[e.target.dataset.id] = {...producto}   
    }   
    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad ===0){
            delete carrito[e.target.data.id]
        }    
    } 
    pintarCarrito()
    e.stopPropagation()
}


