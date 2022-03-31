const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('.col-6');


// Função cadastrar evento
try {
    form.onsubmit = async (evento) => {
        evento.preventDefault();

        const dateTime = inputData.value;
        convertedDate = new Date(dateTime).toISOString();

        const newEvento = {
            name: inputNome.value,
            poster: inputBanner.value,
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
            scheduled: convertedDate,
            number_tickets: parseInt(inputLotacao.value)
        }

        const options = {
            method: "POST",
            body: JSON.stringify(newEvento),
            headers: {
                "Content-type": "application/json; charset=UTF-8 "
            }
        }

        const resultado = await fetch(`${BASE_URL}/events`, options)

        const conteudoResultado = await resultado.json();
        console.log(conteudoResultado); 
        alert("Evento cadastrado com sucesso!")
        window.location.pathname = "/soundgarden-front/admin.html"
    }
} catch {
    alert("Erro ao cadastrar evento!");

}









