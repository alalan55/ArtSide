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
let erroNome = document.querySelector("#errorNome");
let erroEmail = document.querySelector("#errorEmail");
let nomeTemErro = false;
let emailTemErro = false;
let camposValidos = false;


const URL__DEPLOY = 'https://app-email-node.herokuapp.com/send';
const URL__LOCAL = 'http://localhost:3030/send';

mensagemEnviando.style.display = "none";
mensagemSucesso.style.display = "none";
mensagemError.style.display = "none";

const formEnviado = (e) => {
   e.preventDefault();

   if (validarForm()) {

      delay();

      formulario = {
         nome: `${nomeCompleto.value}`,
         email: `${email.value}`,
         mensagem: `${mensagem.value}`
      }
      console.log('entrei aqui')
      fazerRequisicao(JSON.stringify(formulario));
   }
   
}
validarForm = () => {

   nomeCompleto.value == "" ? validaNomeVazio() : validaNomePreenchido();
   email.value == "" ? validaEmailVazio() : validaEmailPreenchido();
   emailTemErro == false && nomeTemErro == false ? camposValidos = true : camposValidos = false;
   return camposValidos;

}

validaNomeVazio = () => {
   erroNome.style.display = "block";
   return nomeTemErro = true;
}
validaNomePreenchido = () => {
   erroNome.style.display = "none";
   return nomeTemErro = false;
}
validaEmailVazio = () => {
   erroEmail.style.display = "block";
   return emailTemErro = true;
}
validaEmailPreenchido = () => {
   erroEmail.style.display = "none";
   return emailTemErro = false;
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
   scroolTop = () => {
      window.scrollTo(0, 0)
   }


form.addEventListener("submit", formEnviado);