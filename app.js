document.addEventListener("DOMContentLoaded", () =>{
    fetchData()
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
      const items = document.getElementById("items")
      const templateCard = document.getElementById("template-card").content  
      const fragment = document.createDocumentFragment();  
      data.forEach(producto =>{
        console.log(templateCard.querySelector("h5"))
        templateCard.querySelector("h5").textContent = producto.title
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src", producto.thumbnailUrl)
        const clone =templateCard.cloneNode(true)
        fragment.appendChild(clone)  
    })  
    items.appendChild(fragment)
}