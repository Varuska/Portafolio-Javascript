/* Validação de Formulario*/
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Letras y espacios, pueden llevar acentos.
    assunto:  /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras y espacios, pueden llevar acentos.
    mensagem:  /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras y espacios, pueden llevar acentos.
    }


    const validarFormulario = (e) => {
   switch (e.target.name) {
    case "usuario":
        validarCampo(expresiones.usuario, e.target, 'usuario');
    break;

    case "email":
        validarCampo(expresiones.email, e.target, 'email');
    break;
        
    case "assunto":
        validarCampo(expresiones.assunto, e.target, 'assunto');
    break;

    case "mensagem":
        validarCampo(expresiones.mensagem, e.target, 'mensagem');
    break;
   }
}
   
const validarCampo = (expresion, input, campo) => {
    if(expresiones.usuario.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-solid fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-solid fa-time-circle');
    } else
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-solid fa-time-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-solid fa-check-circle');
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    });

    /* API openweathermap.org*/

let lon;
let lat;
let temperature = document.querySelector(".temp")
let summary = document.querySelector(".summary")
let loc = document.querySelector(".loc")
let Icon = document.querySelector(".Icon")
const kelvin = 273.15



window.addEventListener("load",() =>{ 
    if (navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position) =>{

            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude; 

            const api_id = "c7c5ee6e7ee39a484ac8553c69062795";

            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&`+ `lon=${lon}&appid=${api_id}`;

            fetch(url_base)
            .then((response) =>{
                console.log("Respuesta json");
                return response.json();
            })

            .then((data) => {

                console.log("Esta es la data")
                console.log(data);

                temperature.textContent = 
                    Math.floor(data.main.temp - kelvin) + "°C";
                summary.textContent = data.weather[0].description;

                loc.textContent = data.name + data.sys.country;
            });

        });
    }

});



//cargarClima