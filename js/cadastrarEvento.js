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
    
        // const dateTime = inputData.value;
        // const [day, month, yearTime] = dateTime.split('/');
        // let convertedDate = [month, day, yearTime].join('/');
        // convertedDate = new Date(convertedDate).toISOString();

    const newEvento = {
        name: inputNome.value,
        poster: inputBanner.value,
        attractions: inputAtracoes.value.split(','),
        description: inputDescricao.value,
        scheduled: new Date(inputData.value).toISOString(),
        number_tickets: parseInt(inputLotacao.value)
    }


    // fetch(`${BASE_URL}/events`, {
    //     method: "POST",
    //     body: JSON.stringify(newEvento),
    //     headers: { "Content-type": "application/json; charset=UTF-8" }
    // })
    //     .then(response => response.json()) // converter para json
    //     .then(json => console.log(json)); //imprimir dados no console


    const options = {
        method: "POST",
        body: JSON.stringify(newEvento),
        headers: {
            "Content-type": "application/json; charset=UTF-8 "
        }
    }

    const resultado = await fetch(`${BASE_URL}/events`, options)

    const conteudoResultado = await resultado.json(); // converter para json
    console.log(conteudoResultado); //imprimir dados no console  



}






