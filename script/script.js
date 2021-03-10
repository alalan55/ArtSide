var form = document.querySelector("#form");



// const formEnviado = (e) =>{
//     console.log("enviado")

//     e.preventDefault();
// }

// form.addEventListener("submit", formEnviado)

form.addEventListener("submit", (e) => {
   e.preventDefault();

   console.log("form enviado")
});