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
        const [day, month, yearTime] = dateTime.split('/');
        let convertedDate = [month, day, yearTime].join('/');
        convertedDate = new Date(convertedDate).toISOString();

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

        const conteudoResultado = await resultado.json(); // converter para json
        console.log(conteudoResultado); //imprimir dados no console  
        alert("Evento cadastrado com sucesso!")
    }
} catch{
    alert("Erro ao cadastrar evento!");
    
}









