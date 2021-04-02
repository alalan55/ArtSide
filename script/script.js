let form = document.querySelector("#form");
let nomeCompleto = document.querySelector("#nomeCompleto");
let email = document.querySelector("#email");
let mensagem = document.querySelector("#mensagem");
let formulario = Object;
let mensagemInteresse = document.querySelector(".texto-fale-conosco");
let mensagemEnviando = document.querySelector(".texto-enviando");
let mensagemSucesso = document.querySelector(".texto-sucesso");
let mensagemError = document.querySelector(".texto-error");
let teveSucesso = false;

const URL__DEPLOY = 'https://app-email-node.herokuapp.com/send';
const URL__LOCAL = 'http://localhost:3030/send';

mensagemEnviando.style.display = "none";
mensagemSucesso.style.display = "none";
mensagemError.style.display = "none";

const formEnviado = (e) => {
   e.preventDefault();
   delay();

   formulario = {
      nome: `${nomeCompleto.value}`,
      email: `${email.value}`,
      mensagem: `${mensagem.value}`
   }

   fazerRequisicao(JSON.stringify(formulario));
}

const fazerRequisicao = async (valor) => {
   try {

      let response = await fetch(URL__DEPLOY, {
         method: 'POST',
         mode: 'cors',
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: valor
      });

      const conteudo = await response.json();
      conteudo.response.includes('OK') ? mensagemDeSucesso() : mensagemDeError();

   } catch (error) {
      mensagemDeError();
      console.error(error);
   }

}

mensagemDeSucesso = () => {
   let intervalo = setInterval(() => {
      teveSucesso = true;
      mensagemSucesso.style.display = "block";
      mensagemEnviando.style.display = "none";

   }, 1000);

   setTimeout(() => {
      clearInterval(intervalo);
      teveSucesso = false;
      mensagemSucesso.style.display = "none";
      mensagemInteresse.style.display = "block";
      form.reset();
   }, 5000);
},

   mensagemDeError = () => {
      let intervalo = setInterval(() => {
         mensagemError.style.display = "block";
         mensagemEnviando.style.display = "none";

      }, 1000);

      setTimeout(() => {
         clearInterval(intervalo);
         mensagemError.style.display = "none";
         mensagemInteresse.style.display = "block";
      }, 6000);
   },

   delay = () => {
      setTimeout(() => {
         mensagemEnviando.style.display = "block";
         mensagemInteresse.style.display = "none";
      }, 1000)
   }


   fechaNavbar = () => {
      let ul = document.querySelector("ul");
      let check = document.querySelector("#check");
      ul.style.left = "100%";
      check.checked = false;
    },
    abreNavbar = () => {
      let ul = document.querySelector("ul");
      let check = document.querySelector("#check");
      check.checked ? (ul.style.left = "0") : (ul.style.left = "100%");
    },

    scroolTop = () =>{
       window.scrollTo(0,0)
    }

form.addEventListener("submit", formEnviado);