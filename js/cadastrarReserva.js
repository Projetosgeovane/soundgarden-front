const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector('#nome');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('.col-6');

try{
    form.onsubmit = async (e) => {
        e.preventDefault();

        const dateTime = inputData.ariaValueMax;
        const [day, month, yearTime] = dateTime.split('/');
        let convertedDate =  [month, day , yearTime].join('/');
        convertedDate = new Date(convertedDate).toISOString();

        const newReserva = {
            owner_name: inputNome.value,
            owner_email: inputNome.value,
            number_tickets: inputNome.value,
            event_id: inputNome.value
        }

        const reservaOptions = {
            method:"Post",
            body: JSON.stringify(newReserva),
            Headers: {
                "Content-type" : "application/json charset=UTF-8"
            }
        }

        const resultado = await fetch(`${BASE_URL}/bookings`, reservaOptions)
        const conteudoResultado = await resultado.json();
        console.log(conteudoResultado);
    }
} catch{
    alert("erro");
}