var cards,templateCard,fragment,carrito

document.addEventListener("DOMContentLoaded", () =>{
    cards = document.getElementById("cards");
    templateCard = document.getElementById("template-card").content 
    fragment = document.createDocumentFragment(); 

     fetchData()
     cards.addEventListener("click", e =>{
        addCarrito(e)
    })

    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }else{
        carrito = {}
    }
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
    localStorage.setItem("carrito", JSON.stringify(carrito))

}


       
