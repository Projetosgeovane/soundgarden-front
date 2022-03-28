const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

console.log("TESTE GIT");



const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('.col-6');


// Função cadastrar evento
form.onsubmit = async (evento) => {
    evento.preventDefault();



    try {


        const newEvento = {
            name: inputNome.value,
            poster: inputBanner.value,
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
            scheduled: "2022-03-24T00:57:37.761Z",
            number_tickets: parseInt(inputLotacao.value)
        }

        const options = {
            method: "POST",
            body: JSON.stringify(newEvento),
            Headers: {
                "Content-type": "application/json",
            },
        }



        const resultado = await fetch(`${BASE_URL}/events`, options);
        const conteudoResultado = await resultado.json();
        console.log(conteudoResultado);
    } catch {
        alert('deu ruim');
    }

    // const dateTime = inputData.value;
    // const [day, month, yearTime] = dateTime.split('/');
    // let convertedDate = [month, day, yearTime].join('/');
    // convertedDate = new Date(convertedDate).toISOString();

}






