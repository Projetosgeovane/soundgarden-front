const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector('#nome');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('.col-6');

form.onsubmit = async(evento) => {
    evento.preventDefault();

    const newEvento = {
        name : inputNome.value,
        description : inputDescricao.value,
        attractions : inputAtracoes.value,
        scheduled: inputData.value,
        number_tickets: inputLotacao.value,
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
}